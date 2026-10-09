# Kế hoạch thiết kế website Việt phục Remix

> Phiên bản 1 · 09/10/2026 · Nhóm thực hiện: Hellosine, KhoaSP
>
> Dữ liệu nguồn: [Viet_phuc_Remix_du_lieu/viet_phuc_data_v4.json](Viet_phuc_Remix_du_lieu/viet_phuc_data_v4.json) (bản 4). Đọc kèm [DOC_TRUOC.md](Viet_phuc_Remix_du_lieu/DOC_TRUOC.md).

---

## 1. Mục tiêu

### 1.1. Website làm gì

Website giới thiệu các trang phục truyền thống Việt Nam (Việt phục) với giao diện hiện đại, trang trọng và đẹp mắt. Ngoài phần trưng bày, trang web có một "phòng phối đồ" để người xem tự phối trang phục cho từng dịp, từ truyền thống tới cách tân, mà vẫn giữ đúng tinh thần văn hóa.

### 1.2. Người dùng chính

| Nhóm | Nhu cầu | Trang web đáp ứng bằng |
|---|---|---|
| Học sinh, sinh viên | Mặc Việt phục dịp Tết, kỷ yếu, ngày hội trường; muốn đẹp, hợp xu hướng | Gợi ý theo dịp, phòng phối đồ, mức "Remix Gen Z" |
| Người yêu cổ phục | Tìm hiểu nguồn gốc, đặc trưng, tranh luận học thuật | Thẻ văn hóa có nhãn kiểm chứng và nguồn |
| Du khách, bạn bè quốc tế | Hiểu nhanh từng loại trang phục | Bộ sưu tập trực quan, câu chữ ngắn gọn |
| Giáo viên, ban tổ chức sự kiện | Tư liệu tin cậy để trình bày | Trang nguồn tham khảo, cảnh báo văn hóa |

### 1.3. Nguyên tắc nội dung

1. **Trung thực về nguồn.** Mọi thông tin văn hóa phải hiện nhãn trạng thái kiểm chứng (Đã có nguồn, Có tranh luận học thuật, Giải thích phổ biến, Cần kiểm chứng…) và mã nguồn bấm được.
2. **Tôn trọng văn hóa.** Cảnh báo W1–W7 hiện đúng lúc, giọng nhẹ nhàng, không cấm đoán.
3. **Dữ liệu một nguồn.** Code chỉ đọc `viet_phuc_data_v4.json`. Không chép tay nội dung vào giao diện.

---

## 2. Định hướng thị giác

### 2.1. Tinh thần thiết kế

"Bảo tàng hiện đại": nền sáng như giấy dó, nhiều khoảng trắng, chữ có chân thanh lịch cho tiêu đề, ảnh trang phục là nhân vật chính. Họa tiết truyền thống (mây, sóng nước, hoa sen, vân trống đồng) chỉ dùng dạng nét mảnh làm điểm nhấn, không phủ kín trang.

Từ khóa: **trang nghiêm · tinh tế · thoáng · có chiều sâu văn hóa**.

Tránh: màu đỏ vàng rực phủ toàn trang, hiệu ứng lòe loẹt, font thư pháp khó đọc, họa tiết dễ bị nhầm với Trung Hoa, Hàn Quốc.

### 2.2. Bảng màu

Lấy từ bảng màu trong dữ liệu (`mau_sac`) để giao diện và nội dung đồng bộ.

| Token | Màu | Hex | Dùng cho |
|---|---|---|---|
| `--nen` | Trắng ngà | `#F6F1E7` | Nền chính |
| `--nen-phu` | Kem | `#F2E6CF` | Nền khối, thẻ |
| `--chu` | Đen | `#262626` | Chữ chính |
| `--chu-phu` | Nâu | `#6A4A34` | Chữ phụ, chú thích |
| `--nhan` | Đỏ son | `#B8322A` | Nút chính, liên kết, điểm nhấn |
| `--vang` | Vàng nghệ | `#E0A526` | Đường viền mảnh, biểu tượng, trạng thái chọn |
| `--tim` | Tím Huế | `#5E3F73` | Khối cung đình (nhật bình, Huế) |
| `--dam` | Xanh navy | `#23395B` | Chân trang, khối nền tối |

Chế độ tối: nền `#1C1A17`, chữ `#F2E6CF`, giữ đỏ son và vàng nghệ làm điểm nhấn (tăng sáng nhẹ để đủ tương phản). Mọi cặp chữ/nền phải đạt tỷ lệ tương phản WCAG AA (≥ 4.5:1 cho chữ thường).

### 2.3. Kiểu chữ

Cả hai font đều hỗ trợ đầy đủ dấu tiếng Việt (tải từ Google Fonts, subset `vietnamese`).

| Vai trò | Font | Cỡ (desktop / mobile) |
|---|---|---|
| Tiêu đề lớn (H1) | Playfair Display, 600 | 56px / 36px |
| Tiêu đề mục (H2) | Playfair Display, 500 | 36px / 28px |
| Tiêu đề thẻ (H3) | Be Vietnam Pro, 600 | 20px / 18px |
| Văn bản | Be Vietnam Pro, 400 | 17px / 16px, line-height 1.7 |
| Nhãn, chú thích | Be Vietnam Pro, 500, chữ hoa giãn 0.08em | 12px |

### 2.4. Lưới và khoảng cách

- Lưới 12 cột, rộng tối đa 1200px, khoảng cách cột 24px. Lề hai bên 16px trên điện thoại.
- Thang khoảng cách: 4 · 8 · 16 · 24 · 40 · 64 · 104px. Giữa các khối lớn dùng 104px (desktop) và 64px (mobile).
- Điểm ngắt: 480px, 768px, 1024px, 1280px.

### 2.5. Hình ảnh và minh họa

- **Ảnh chụp:** người mẫu mặc trang phục trên nền trơn hoặc bối cảnh thật (Huế, phố cổ, đình làng). Tỷ lệ dọc 4:5 cho thẻ, 16:9 cho banner. Ánh sáng tự nhiên, tông ấm.
- **Minh họa vector:** mỗi trang phục có một hình minh họa dáng áo, chia lớp theo vị trí (`dau`, `co`, `khoac`, `eo`, `tay`, `quan`, `chan`) để phòng phối đồ chồng phụ kiện lên.
- **Lưu ý bắt buộc:** áo nhật bình và áo giao lĩnh phải vẽ theo ảnh hiện vật hoặc ảnh phục dựng từ nguồn S13 và S25 (xem Điểm còn mở trong DOC_TRUOC).
- Ảnh lấy từ nguồn ngoài phải có giấy phép rõ ràng (ví dụ Wikimedia Commons CC BY-SA) và ghi công dưới ảnh.
- Định dạng AVIF/WebP, có ảnh dự phòng JPEG, tải lười (lazy-load) với ảnh dưới màn hình đầu.

### 2.6. Chuyển động

- Hiện dần khi cuộn (fade + trượt 16px, 400ms, easing `cubic-bezier(.2,.7,.2,1)`).
- Ảnh thẻ phóng nhẹ 1.03 khi rê chuột.
- Phòng phối đồ: phụ kiện mới chọn mờ dần vào hình trong 200ms.
- Tôn trọng `prefers-reduced-motion`: tắt mọi chuyển động trang trí.

---

## 3. Sơ đồ trang

```
Trang chủ  /
├── Bộ sưu tập  /trang-phuc
│   └── Chi tiết trang phục  /trang-phuc/[id]
├── Mặc dịp nào  /dip-mac
│   └── Chi tiết bối cảnh  /dip-mac/[id]
├── Phòng phối đồ  /phoi-do
├── Bảng màu Việt  /bang-mau
├── Nguồn tham khảo  /nguon-tham-khao
└── Giới thiệu  /gioi-thieu
```

Thanh điều hướng: Logo · Bộ sưu tập · Mặc dịp nào · Phòng phối đồ · Bảng màu · Giới thiệu · [nút "Phối đồ ngay" màu đỏ son]. Trên mobile thu thành menu toàn màn hình.

Chân trang: nền xanh navy, gồm mô tả ngắn, liên kết nhanh, tên nhóm thực hiện, ghi chú "Nội dung có dẫn nguồn, xem trang Nguồn tham khảo".

---

## 4. Thiết kế chi tiết từng trang

### 4.1. Trang chủ `/`

```
┌───────────────────────────────────────────────────────────┐
│ [Logo]   Bộ sưu tập  Dịp mặc  Phối đồ  Bảng màu  [Phối đồ] │
├───────────────────────────────────────────────────────────┤
│                                                           │
│   VIỆT PHỤC REMIX                    ┌────────────────┐   │
│   Mặc cổ phục theo cách              │  Ảnh hero dọc  │   │
│   của thế hệ mới                     │  (áo ngũ thân) │   │
│   [Khám phá bộ sưu tập] [Phối đồ]    └────────────────┘   │
│                                                           │
├──────────────── họa tiết sóng nước nét mảnh ──────────────┤
│  BỘ SƯU TẬP                                               │
│  [Ngũ thân] [Áo dài] [Tứ thân] [Nhật bình] [Giao lĩnh] →  │
├───────────────────────────────────────────────────────────┤
│  BA MỨC PHONG CÁCH                                        │
│  Truyền thống  ──  Cách tân nhẹ  ──  Remix Gen Z          │
├───────────────────────────────────────────────────────────┤
│  HÔM NAY BẠN MẶC ĐI ĐÂU?                                  │
│  [Tết] [Kỷ yếu] [Huế] [Quan họ] [Miền Tây] [Đám cưới] …   │
├───────────────────────────────────────────────────────────┤
│  CÂU CHUYỆN NĂM THÂN ÁO (khối trích dẫn, nền kem)         │
├───────────────────────────────────────────────────────────┤
│  Chân trang                                               │
└───────────────────────────────────────────────────────────┘
```

| Khối | Nội dung | Dữ liệu |
|---|---|---|
| Hero | Tiêu đề, câu dẫn, 2 nút, ảnh lớn bên phải (mobile: ảnh nằm trên) | Tĩnh |
| Bộ sưu tập | Dải thẻ cuộn ngang, mỗi thẻ: ảnh, tên, giới tính | `trang_phuc` với `co_the_chon = true` và `thuoc = null` |
| Ba mức phong cách | 3 cột, mỗi cột một hình minh họa cùng một bộ áo ở ba mức | `muc_phong_cach` |
| Dịp mặc | Lưới chip/thẻ nhỏ có biểu tượng | `boi_canh` |
| Câu chuyện | Trích ý nghĩa năm thân, có nhãn "Giải thích phổ biến" và liên kết tới thẻ tranh luận | `ngu_than_y_nghia`, `ngu_than_tranh_luan` |

### 4.2. Bộ sưu tập `/trang-phuc`

- Đầu trang: tiêu đề, một đoạn dẫn, bộ lọc.
- **Bộ lọc:** giới tính (Nam / Nữ / Cả hai), mức phong cách tối đa, trạng thái kiểm chứng.
- **Lưới thẻ:** 3 cột desktop, 2 cột tablet, 1 cột mobile. Thẻ gồm ảnh 4:5, tên, 2–3 đặc trưng nhận diện dạng chip, nhãn mức phong cách tối đa.
- Chỉ hiện các trang phục chính và biến thể chọn được: áo ngũ thân, áo tấc, áo dài hiện đại, áo tứ thân, áo mớ ba mớ bảy, áo nhật bình, áo giao lĩnh, áo bà ba.
- Không hiện mục `hien_thi = false` (quần lãnh Mỹ A). Mục `co_the_chon = false` (Ý nghĩa 5 thân, Tranh luận nguồn gốc, Tay raglan, Yếm) chỉ hiện trong trang chi tiết của trang phục cha.

### 4.3. Chi tiết trang phục `/trang-phuc/[id]`

```
┌─────────────────────┬─────────────────────────────────────┐
│                     │ ÁO NGŨ THÂN                         │
│   Ảnh lớn / slider  │ Nam, nữ · Tối đa: Remix Gen Z       │
│   (ảnh + minh họa)  │ [Đã có nguồn] S1 S23 S3             │
│                     │                                     │
│                     │ Mô tả nguồn gốc và đặc điểm…        │
│                     │ [Phối bộ này →]                     │
├─────────────────────┴─────────────────────────────────────┤
│ ĐẶC TRƯNG NHẬN DIỆN                                        │
│ (sơ đồ áo có chú thích chỉ vào: cổ đứng, năm thân, xẻ tà…) │
├───────────────────────────────────────────────────────────┤
│ THẺ VĂN HÓA (mục con)                                      │
│ ┌ Ý nghĩa 5 thân  [Giải thích phổ biến] ┐                  │
│ └ Tranh luận về nguồn gốc  [Có tranh luận học thuật] ┘     │
├───────────────────────────────────────────────────────────┤
│ MẶC CÙNG: thành phần cố định + phụ kiện truyền thống       │
├───────────────────────────────────────────────────────────┤
│ BIẾN THỂ & CÁCH TÂN (áo tấc, tay lỡ, tà ngắn…)             │
├───────────────────────────────────────────────────────────┤
│ HỢP VỚI DỊP NÀO (thẻ bối cảnh có trang phục này)           │
├───────────────────────────────────────────────────────────┤
│ Cảnh báo văn hóa (nếu có, ví dụ W5, W6 với nhật bình)      │
└───────────────────────────────────────────────────────────┘
```

- Sơ đồ đặc trưng nhận diện: hình vẽ áo có các điểm đánh số, rê chuột hoặc chạm vào điểm thì hiện chú thích kèm mã nguồn.
- Mục con có `trang_thai_kiem_chung` khác "Đã có nguồn" phải dùng câu chữ thận trọng ("thường được cho là").
- Áo nhật bình và áo giao lĩnh: hiện cảnh báo W5/W6 ngay đầu trang dạng khung thông tin, kèm ảnh hiện vật có nguồn.

### 4.4. Mặc dịp nào `/dip-mac` và `/dip-mac/[id]`

- **Danh sách:** 10 thẻ bối cảnh, mỗi thẻ có ảnh nền, tên, thời điểm, dải bảng màu gợi ý (các chấm màu).
- **Chi tiết bối cảnh:**
  - Nhu cầu người dùng (danh sách gạch đầu dòng).
  - Gợi ý trang phục nữ / nam (hai cột thẻ, bấm vào là tới trang chi tiết).
  - Lưu ý văn hóa (khung nền kem, viền trái vàng nghệ).
  - Mức phong cách tối đa (thanh 3 nấc, nấc vượt mức bị mờ).
  - Bảng màu gợi ý kèm nguồn và nhãn trạng thái.
  - Nút "Phối đồ cho dịp này" mở `/phoi-do?dip=<id>`.

### 4.5. Phòng phối đồ `/phoi-do` (tính năng trọng tâm)

Bố cục desktop 3 cột, mobile chuyển thành hình ở trên và các bước dạng tab ở dưới.

```
┌──────────────┬───────────────────────────┬──────────────────┐
│ 1. Dịp mặc   │                           │ ĐIỂM HÀI HÒA     │
│ 2. Trang phục│     HÌNH MINH HỌA         │ 88 · Rất hài hòa │
│ 3. Mức       │     (chồng lớp theo       │                  │
│    phong cách│      vị trí phụ kiện)     │ CẢNH BÁO         │
│ 4. Màu áo    │                           │ ⚠ W3 …           │
│    + màu phụ │                           │                  │
│ 5. Phụ kiện  │                           │ THẺ VĂN HÓA      │
│   (chip)     │                           │ [Nhờ AI tư vấn]  │
└──────────────┴───────────────────────────┴──────────────────┘
```

**Luồng thao tác**

1. Chọn dịp → danh sách trang phục lọc theo `trang_phuc_nu` / `trang_phuc_nam` của bối cảnh (có lựa chọn "Xem tất cả").
2. Chọn trang phục → hình minh họa cập nhật, thẻ văn hóa hiện ở cột phải.
3. Chọn mức phong cách → hiện rõ mức được phép. Chọn vượt mức vẫn được nhưng bật W2 (chờ nhóm chốt, xem mục 9).
4. Chọn màu áo và màu phụ → từ bảng màu gợi ý của dịp, có thể chọn màu tự do (`cho_phep_mau_tu_do = true`).
5. Chọn phụ kiện dạng chip → chỉ hiện phụ kiện hợp lệ; chip bị khóa có chú thích lý do.

**Quy tắc logic (lấy nguyên từ dữ liệu)**

| Quy tắc | Cách tính |
|---|---|
| Mức được phép | `min(muc_toi_da(bối cảnh), muc_toi_da(trang phục))` theo `thu_tu` |
| Hiện phụ kiện | Mức đang chọn ≥ `muc_toi_thieu` của phụ kiện; phụ kiện thuộc `ap_dung_cho` của trang phục; nếu có `chi_o_boi_canh` thì phải trùng dịp |
| Vị trí chọn một món | `chan`, `khoac`, `mat`, `quan`: chọn món mới thì thay món cũ |
| W7 | Chọn quá 2 món trong `mon_remix_lon` (blazer mỏng, quần jeans, sneaker trắng, boots cổ thấp) |
| W3 | Mọi màu đã chọn đều thuộc nhóm Trắng hoặc đều thuộc nhóm Đen, ở dịp Tết hoặc đám cưới |
| W1 | Chọn yếm remix ở dịp quan họ, đình chùa |
| W5, W6 | Chọn áo nhật bình / áo giao lĩnh |
| Điểm hài hòa | Theo `quy_tac_hai_hoa`: đổi hex sang HSL, phân loại Trung tính (88) → Tương đồng (90) → Bổ trợ (85) → Tương phản (65), trừ điểm theo điều kiện, xếp loại Rất hài hòa / Hài hòa / Nên cân nhắc |

Toàn bộ phần trên chạy ở trình duyệt, không gọi AI.

**Nhờ AI tư vấn (tùy chọn)**

- Chỉ gọi khi người dùng bấm nút. Gửi đúng một gói JSON như `cau_hinh_ai.dau_vao` mô tả, dùng `system_instruction` và `response_schema` có sẵn.
- Khóa API của Gemini để ở hàm serverless (ví dụ Vercel Function, Cloudflare Worker), **không** đặt trong mã chạy ở trình duyệt.
- Mất mạng hoặc lỗi API thì hiện phản hồi dự phòng có trong dữ liệu.
- Kết quả AI hiện trong khung riêng có nhãn "Gợi ý của AI", không ghi đè điểm hài hòa hay cảnh báo.

**Chia sẻ:** nút "Lưu ảnh bộ phối" (xuất PNG từ canvas) và "Sao chép liên kết" (trạng thái mã hóa trên URL, ví dụ `/phoi-do?dip=tet&ao=ao_ngu_than&muc=cach_tan_nhe&mau=do_son,kem&pk=khan_van,guoc`).

### 4.6. Bảng màu Việt `/bang-mau`

- Lưới 23 ô màu, mỗi ô: mảng màu lớn, tên, mã hex (bấm để sao chép).
- Lọc theo dịp: làm nổi các màu nằm trong bảng gợi ý của dịp đó.
- Ghi chú rõ: bảng màu là "Gợi ý thẩm mỹ", trừ phần có nguồn (ví dụ yếm đỏ thắm, S12).

### 4.7. Nguồn tham khảo `/nguon-tham-khao`

- Bảng 30 nguồn (S1–S30): mã, tên, loại (Học thuật, Báo chí, Bảo tàng, Phổ thông), liên kết, ghi chú.
- Lọc theo loại nguồn. Mỗi mã nguồn ở các trang khác đều liên kết về đúng dòng ở đây (`/nguon-tham-khao#S23`).
- Phần giải thích ý nghĩa các nhãn trạng thái kiểm chứng.
- Nguồn đã bị thay thế (ví dụ S8, S10, S14) hiện mờ, kèm ghi chú "Đã thay bằng…".

### 4.8. Giới thiệu `/gioi-thieu`

Mục đích dự án, cách nhóm thu thập và kiểm chứng dữ liệu, ba mức phong cách, nhóm thực hiện (Hellosine, KhoaSP), thông tin liên hệ.

---

## 5. Thành phần giao diện dùng chung

| Thành phần | Mô tả |
|---|---|
| `NhanKiemChung` | Huy hiệu nhỏ theo 8 trạng thái trong `meta.nhan_trang_thai`. Mỗi trạng thái có màu và biểu tượng riêng, có tooltip giải thích |
| `MaNguon` | Chip `S23` bấm được, rê chuột hiện tên nguồn |
| `TheTrangPhuc` | Ảnh 4:5, tên, chip đặc trưng, nhãn mức tối đa |
| `TheBoiCanh` | Ảnh nền, tên, thời điểm, dải chấm màu |
| `TheVanHoa` | Khung nội dung văn hóa có nhãn và nguồn, dùng ở trang chi tiết và phòng phối đồ |
| `ThanhMucPhongCach` | 3 nấc, đánh dấu mức được phép, nấc vượt mức có viền đứt |
| `CanhBao` | Khung cảnh báo nền vàng nhạt, biểu tượng, thông điệp, nguồn. Có nút "Đã hiểu" |
| `ChipPhuKien` | Trạng thái: thường, đã chọn, bị khóa (kèm lý do) |
| `ODiemHaiHoa` | Vòng tròn điểm, phân loại, câu nhắc khi bị trừ điểm |
| `HoaTiet` | SVG nét mảnh (sóng nước, mây, hoa sen) dùng làm đường phân cách |
| `Nut` | Chính (nền đỏ son), phụ (viền), chữ. Cao tối thiểu 44px |

---

## 6. Kỹ thuật

### 6.1. Công nghệ đề xuất

| Hạng mục | Lựa chọn | Lý do |
|---|---|---|
| Khung web | **Astro** + TypeScript | Trang nội dung xuất tĩnh, tải nhanh, tốt cho SEO; chỉ phần cần tương tác mới chạy JavaScript |
| Phần tương tác | React (island) cho phòng phối đồ | Quản lý trạng thái phối đồ thuận tiện |
| CSS | CSS thuần với biến (token ở mục 2) | Nhẹ, dễ đổi chủ đề sáng/tối |
| Ảnh | `astro:assets` | Tự tạo AVIF/WebP, nhiều kích thước |
| AI | Gemini qua hàm serverless | Giữ bí mật khóa API |
| Triển khai | Vercel hoặc Netlify (gói miễn phí) | Có sẵn hàm serverless, tự triển khai khi đẩy lên `main` |
| Kiểm thử | Vitest cho logic quy tắc; Playwright cho luồng phối đồ | Logic cảnh báo, điểm hài hòa cần kiểm thử kỹ |

### 6.2. Cấu trúc thư mục dự kiến

```
VietClothing/
├── Viet_phuc_Remix_du_lieu/      # Dữ liệu gốc (không sửa CSV riêng)
├── public/
│   └── hinh/                     # Ảnh, minh họa SVG theo lớp
├── src/
│   ├── du-lieu/
│   │   └── doc-du-lieu.ts        # Đọc JSON, kiểu TypeScript, hàm tra cứu theo ID
│   ├── logic/
│   │   ├── muc-phong-cach.ts     # Mức được phép, lọc phụ kiện
│   │   ├── canh-bao.ts           # W1–W7
│   │   └── hai-hoa.ts            # Điểm hài hòa màu
│   ├── components/               # Thành phần ở mục 5
│   ├── layouts/
│   ├── pages/                    # Các route ở mục 3
│   └── styles/
│       └── token.css             # Màu, chữ, khoảng cách
├── api/
│   └── tu-van.ts                 # Hàm serverless gọi Gemini
├── KE_HOACH_THIET_KE.md
└── README.md
```

### 6.3. Làm việc với dữ liệu

- Viết kiểu TypeScript cho từng bảng (`TrangPhuc`, `BoiCanh`, `PhuKien`, `MauSac`, `QuyTacCanhBao`, `Nguon`).
- Khi build, kiểm tra tính toàn vẹn: mọi ID tham chiếu (phụ kiện, nguồn, màu, cảnh báo) phải tồn tại; báo lỗi build nếu thiếu.
- Trang chi tiết sinh tĩnh từ danh sách ID (`getStaticPaths`).

---

## 7. Chất lượng

### 7.1. Truy cập (accessibility)

- Tương phản WCAG AA, đi lại được bằng bàn phím, viền focus rõ (2px vàng nghệ).
- Ảnh có `alt` mô tả trang phục; ảnh trang trí để `alt=""`.
- Chip phụ kiện và thanh mức phong cách dùng đúng vai trò ARIA (`checkbox`, `radiogroup`).
- Cảnh báo dùng `role="status"` để trình đọc màn hình đọc lên.
- Thẻ `<html lang="vi">`.

### 7.2. Hiệu năng

- Mục tiêu Lighthouse ≥ 90 cho cả bốn hạng mục trên mobile.
- LCP < 2.5s, CLS < 0.1. Ảnh hero tải ưu tiên, có kích thước cố định.
- Chỉ tải phông đúng subset và độ đậm cần dùng, `font-display: swap`.

### 7.3. SEO và chia sẻ

- Mỗi trang có `title`, `description`, ảnh Open Graph riêng (trang trang phục dùng ảnh của trang phục đó).
- Dữ liệu có cấu trúc `Article` cho trang chi tiết, `sitemap.xml`, đường dẫn tiếng Việt không dấu.

---

## 8. Lộ trình

| Giai đoạn | Việc chính | Kết quả | Phụ trách |
|---|---|---|---|
| 1. Nền tảng (tuần 1) | Khởi tạo Astro, token CSS, font, layout, điều hướng, đọc dữ liệu và kiểm tra ID | Khung trang chạy được, dữ liệu có kiểu | |
| 2. Trang nội dung (tuần 2–3) | Trang chủ, bộ sưu tập, chi tiết trang phục, dịp mặc, bảng màu, nguồn, giới thiệu | Toàn bộ phần trưng bày | |
| 3. Minh họa (song song tuần 2–4) | Vẽ minh họa vector theo lớp cho 8 trang phục; ảnh chụp hoặc ảnh có giấy phép | Bộ hình hoàn chỉnh | |
| 4. Phòng phối đồ (tuần 4–5) | Logic mức phong cách, phụ kiện, W1–W7, điểm hài hòa, kiểm thử Vitest | Phối đồ chạy không cần AI | |
| 5. AI và chia sẻ (tuần 6) | Hàm serverless Gemini, phản hồi dự phòng, xuất ảnh, liên kết chia sẻ | Tính năng "Nhờ AI tư vấn" | |
| 6. Hoàn thiện (tuần 7) | Kiểm tra truy cập, hiệu năng, SEO, thử trên thiết bị thật, rà nội dung với nhóm nội dung | Bản phát hành | |

Nhóm tự điền cột "Phụ trách".

---

## 9. Điểm cần nhóm thống nhất

1. **Chọn vượt mức phong cách:** giữ như hiện tại (chỉ cảnh báo W2, vẫn cho chọn) hay khóa hẳn? Đề xuất: giữ cảnh báo để người dùng tự quyết, nhưng hiện nhãn "Vượt mức gợi ý" trên ảnh xuất ra.
2. **Hình minh họa nhật bình, giao lĩnh:** cần ảnh hiện vật hoặc ảnh phục dựng từ S13, S25 trước khi vẽ.
3. **Nội dung chưa đủ nguồn:** áo mớ ba mớ bảy (S19, S20 là nguồn phổ thông), trang sức cài đầu cho nhật bình, cảnh báo W3, W4. Trong lúc chờ, hiện nhãn "Cần kiểm chứng" / "Giải thích phổ biến".
4. **Ảnh chụp:** tự chụp với người mẫu, hợp tác với tiệm cho thuê Việt phục, hay chỉ dùng minh họa và ảnh có giấy phép?
5. **Ngôn ngữ:** chỉ tiếng Việt hay thêm bản tiếng Anh cho bối cảnh "Giao lưu quốc tế"?
6. **Tên miền và nơi triển khai.**
