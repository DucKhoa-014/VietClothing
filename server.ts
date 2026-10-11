import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Load viet_phuc_data_v4.json for server-side fallbacks & rules
const dataFilePath = path.join(__dirname, 'Viet_phuc_Remix_du_lieu', 'viet_phuc_data_v4.json');
let vietPhucData: any = null;
try {
  vietPhucData = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
} catch (err) {
  console.warn('Could not read viet_phuc_data_v4.json:', err);
}

// API endpoint for AI consultation (Nhờ AI tư vấn)
app.post('/api/tu-van', async (req, res) => {
  const { boi_canh, trang_phuc, phu_kien, mau, ket_qua_hai_hoa, canh_bao } = req.body;

  // Prepare fallback response
  const generateFallback = () => {
    // Check if matched demo scenario
    const demo = vietPhucData?.cau_hinh_ai?.phan_hoi_mau?.[0];
    if (
      demo &&
      demo.kich_ban.boi_canh === boi_canh?.id &&
      demo.kich_ban.trang_phuc === trang_phuc?.id
    ) {
      return demo.phan_hoi;
    }

    const tpTen = trang_phuc?.ten || 'trang phục';
    const bcTen = boi_canh?.ten || 'dịp này';
    const diem = ket_qua_hai_hoa?.diem ?? 85;
    const phanLoai = ket_qua_hai_hoa?.xep_loai || 'Hài hòa';

    const warnings = Array.isArray(canh_bao) ? canh_bao : [];
    const hasWarnings = warnings.length > 0;

    return {
      nhan_xet: `Bộ ${tpTen} phối cho dịp ${bcTen} mang lại cảm giác trang nhã, vừa giữ được tinh thần cổ phục vừa thể hiện cá tính riêng. Điểm màu sắc đạt ${diem} (${phanLoai}).`,
      giai_thich_hai_hoa: ket_qua_hai_hoa?.ly_do || 'Sự phối hợp giữa màu áo chính và màu phụ tạo nên nét tương phản nhẹ nhàng, tôn vinh dáng áo truyền thống.',
      goi_y_dieu_chinh: hasWarnings
        ? [warnings[0]?.thong_diep || 'Chú ý các phụ kiện và ngữ cảnh để bộ đồ luôn trang trọng.']
        : [
            'Có thể chọn thêm phụ kiện truyền thống (khăn vấn, quạt hoặc nón) để tạo điểm nhấn cổ phong.',
            'Nếu chụp ảnh ngoài trời, hãy chọn góc đón ánh sáng tự nhiên để màu áo nổi bật nhất.'
          ],
      meo_tao_dang: [
        'Đứng thẳng, hai tay khẽ xếp phía trước hoặc giữ nhẹ tà áo để tôn dáng áo.',
        'Góc chụp nghiêng 45 độ giúp khoe trọn đường may tà áo và cổ áo đặc trưng.',
        'Bước chậm tự nhiên để bắt khoảnh khắc tà áo chuyển động uyển chuyển.'
      ]
    };
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json({
      success: true,
      data: generateFallback(),
      source: 'fallback'
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const systemInstruction =
      vietPhucData?.cau_hinh_ai?.system_instruction ||
      'Bạn là trợ lý phối Việt phục. Chỉ dùng thông tin trong gói JSON gửi kèm. Trả lời JSON theo đúng schema.';

    const payload = {
      boi_canh,
      trang_phuc: {
        id: trang_phuc?.id,
        ten: trang_phuc?.ten,
        mo_ta: trang_phuc?.mo_ta,
        dac_trung_nhan_dien: trang_phuc?.dac_trung_nhan_dien,
        trang_thai_kiem_chung: trang_phuc?.trang_thai_kiem_chung
      },
      phu_kien,
      mau,
      ket_qua_hai_hoa,
      canh_bao
    };

    const promptText = `Hãy tư vấn bộ phối Việt phục sau đây dựa trên các thông số đã tính toán:\n${JSON.stringify(payload, null, 2)}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: 'application/json'
      }
    });

    const text = response.text?.trim() || '{}';
    const parsed = JSON.parse(text);

    return res.json({
      success: true,
      data: parsed,
      source: 'gemini'
    });
  } catch (error: any) {
    console.error('Error invoking Gemini:', error?.message || error);
    return res.json({
      success: true,
      data: generateFallback(),
      source: 'fallback_error',
      note: 'Chưa kết nối được AI, sử dụng gợi ý tích hợp từ dữ liệu.'
    });
  }
});

// Setup Vite dev server or static serve
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
