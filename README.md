# renting-backend
## Scripts để chạy trong lúc code
### npm run dev
Chạy server ở port 5000(localhost)

## Server được deploy trên heroku
Link: https://backend-hung-kha-renting.herokuapp.com/

# Các bước thực hiện trong môi trường development:
 -  Tạo database ***renting***.
 -  Tạo các table:
`sequelize db:migrate`
 -  Tạo data mẫu
 `sequelize db:seed:all`
 
  ### *nếu cần xóa data mẫu*
 `sequelize db:seed:undo:all`

 ### `.env`
`DATABASE_URL = 
DEV_DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/renting`