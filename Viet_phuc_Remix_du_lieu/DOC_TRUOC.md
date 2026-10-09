# Việt phục Remix – dữ liệu cho phần demo

Dữ liệu bản 4, cập nhật ngày 09/10/2026.

## Các file

| File | Nội dung |
|---|---|
| `viet_phuc_data_v4.json` | Toàn bộ dữ liệu cho app. **Code chỉ đọc file này.** |
| `01_Trang_phuc.csv` | 13 mục trang phục: mô tả nguồn gốc, đặc trưng nhận diện, thành phần cố định, phụ kiện, mức phong cách tối đa, nguồn |
| `02_Boi_canh.csv` | 10 bối cảnh: trang phục nữ/nam phù hợp, nhu cầu, lưu ý văn hóa, mức phong cách tối đa, mã cảnh báo, bảng màu gợi ý |
| `03_Phu_kien.csv` | 20 phụ kiện và 3 biến thể remix, kèm điều kiện hiển thị |
| `04_Mau_sac.csv` | 23 màu có tên và mã hex |
| `05_Canh_bao.csv` | 7 quy tắc cảnh báo W1–W7 và thông điệp hiển thị |
| `06_Nguon.csv` | 30 nguồn tham khảo (mã S1–S30) kèm link |

Các file CSV được xuất tự động từ file JSON để tiện đọc và rà soát nội dung. Nếu cần sửa nội dung, hãy báo nhóm nội dung để sửa ở dữ liệu gốc và xuất lại, đừng sửa riêng CSV.

## Cách các bảng liên kết

- Mọi mục đều có cột `ID`. Các cột như "Thuộc trang phục", "Áp dụng cho", "Trang phục nữ/nam" trong CSV hiển thị tên cho dễ đọc; trong JSON chúng là danh sách ID.
- Mã nguồn (S1, S2…) tra ở `06_Nguon.csv`. Mã cảnh báo (W1–W7) tra ở `05_Canh_bao.csv`.
- Trang phục có "Chọn được trong app = Không" (ví dụ "Ý nghĩa 5 thân", "Tay raglan") không phải lựa chọn riêng. Chúng hiển thị bên trong thẻ văn hóa của trang phục cha.
- Mục có "Hiển thị = Không" (quần lãnh Mỹ A) không đưa vào app.

## Ba mức phong cách

| ID | Tên | Ý nghĩa |
|---|---|---|
| `truyen_thong` | Truyền thống | Mặc đúng bộ, giữ màu sắc và phụ kiện truyền thống |
| `cach_tan_nhe` | Cách tân nhẹ | Giữ dáng áo và đặc trưng nhận diện, thay đổi chất liệu, màu hoặc chi tiết nhỏ |
| `remix_gen_z` | Remix Gen Z | Phối với đồ hiện đại, vẫn giữ ít nhất một đặc trưng nhận diện |

Mức được phép = mức thấp hơn giữa "Mức phong cách tối đa" của bối cảnh và của trang phục. Một phụ kiện chỉ hiện khi mức đang chọn bằng hoặc cao hơn "Mức phong cách tối thiểu" của nó.

## Nhãn trạng thái kiểm chứng

Thẻ văn hóa trong app cần hiển thị nhãn này cạnh nội dung.

- **Đã có nguồn**: có nguồn báo chí, bảo tàng hoặc học thuật.
- **Có tranh luận học thuật**: các nhà nghiên cứu chưa thống nhất. Viết "thường được cho là", không khẳng định.
- **Giải thích phổ biến**: cách hiểu phổ biến, chưa có nguồn học thuật.
- **Cần kiểm chứng**: nguồn hiện chỉ là trang phổ thông.
- **Gợi ý thẩm mỹ** / **Quy tắc thiết kế của app**: lựa chọn của nhóm, không phải dữ kiện văn hóa.

## Chỉ có trong JSON

- `quy_tac_phoi`: số món remix lớn tối đa, các vị trí chỉ chọn được một món, cách kích hoạt W3 và W7.
- `quy_tac_hai_hoa`: cách tính điểm hài hòa màu (app tự tính, không gọi AI).
- `cau_hinh_ai`: system instruction, response schema cho Gemini và phản hồi dự phòng cho kịch bản demo.

## Điểm còn mở

1. Hình minh họa áo nhật bình và áo giao lĩnh cần vẽ theo ảnh hiện vật hoặc ảnh phục dựng từ nguồn S13 và S25, vì hai dáng áo này dễ bị nhầm với Hán phục hoặc Hanbok.
2. Khi người dùng chọn mức phong cách cao hơn mức được phép: hiện chỉ cảnh báo (W2) nhưng vẫn cho chọn. Cần thống nhất giữ như vậy hay khóa hẳn.
3. Ba mục chưa đủ nguồn: áo mớ ba mớ bảy (S19, S20 là nguồn phổ thông), trang sức cài đầu cho nhật bình, và cảnh báo W3, W4.
