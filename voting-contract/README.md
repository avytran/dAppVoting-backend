# ⚙️ VoteChain Backend - Smart Contracts & Blockchain Setup

Thư mục này chứa toàn bộ mã nguồn Smart Contract, các script triển khai và cấu hình môi trường blockchain cục bộ (Local Blockchain) cho dự án VoteChain.

## 🛠 Yêu cầu hệ thống

- Node.js v18 hoặc mới hơn
- npm hoặc yarn

## 📦 Cài đặt

1. Mở terminal tại thư mục `voting-contract`
    ```bash
    cd voting-contract
    ```
2. Cài đặt dependencies:
   ```bash
   npm install
   ```

## 🧹 Chuẩn bị và chạy local

Trước khi deploy, thực hiện cleanup và compile:

```bash
npx hardhat clean
npx hardhat compile
```

Tiếp theo, khởi chạy node Hardhat local:

```bash
npx hardhat node
```

Và trong terminal mới, deploy contract:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

## 🚀 Chạy môi trường Local với Hardhat

### Bước 1: Khởi chạy Node Blockchain

Lệnh này sẽ tạo một mạng Ethereum ảo chạy trên máy tính của bạn.

```bash
npx hardhat node
```

> QUAN TRỌNG: Giữ terminal này luôn mở. Sau khi chạy, terminal sẽ hiển thị danh sách 20 tài khoản (Account #0 đến #19) cùng với Private Key.

### Bước 2: Deploy Smart Contract

Mở một terminal mới và chạy:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Sau khi hoàn tất, bạn sẽ nhận được địa chỉ contract (ví dụ: `0x5FbDB...`). Hãy lưu lại để cấu hình frontend.

## 🦊 Import ví Hardhat vào MetaMask

Để tương tác với ứng dụng, bạn cần thêm mạng và import tài khoản từ Hardhat vào MetaMask.

### Thêm mạng Hardhat vào MetaMask

- Mở MetaMask -> Settings -> Networks -> Add Network -> Add a network manually
- Network Name: `Hardhat Local`
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `31337`
- Currency Symbol: `ETH`

### Import tài khoản Admin (Account #0)

1. Quay lại terminal đang chạy `npx hardhat node`
2. Tìm dòng riêng tư `Private Key` của Account #0 và sao chép nó
3. Trong MetaMask: click vào icon profile -> Import Account
4. Dán private key và nhấn Import

> Lưu ý: Tài khoản này có sẵn 10000 ETH ảo để sử dụng cho phí gas.

## ✅ Chạy test Smart Contract

Trước khi chạy test, đảm bảo bạn đã cài đặt dependencies.

- Để chạy test trong môi trường mặc định của Hardhat:

    ```bash
    npx hardhat test
    ```

- Nếu bạn muốn xem báo cáo gas cho các test:

    ```bash
    REPORT_GAS=true npx hardhat test
    ```

> Nếu cần chạy test trên mạng local đang hoạt động, hãy chắc chắn `npx hardhat node` vẫn đang chạy và cấu hình `network` phù hợp ở file `hardhat.config.js`.

## 📌 Gợi ý sử dụng

- Giữ terminal Hardhat node chạy liên tục khi bạn deploy contract và tương tác từ frontend
- Sử dụng địa chỉ contract được hiển thị sau khi deploy để cấu hình trên frontend
- Nếu cần reset mạng, dừng `npx hardhat node` và chạy lại, sau đó deploy lại contract
