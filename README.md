# app
<div style="background-color: #f2f2f2; padding: 10px;">
  <h3>To start a server:</h3>
  <p>Create PostgreSQL data base.</p>
  <p>Create a .env file in server folder with variables like this</p>
  <ul>
    <li>DB_HOST</li>
    <li>DB_PORT</li>
    <li>DB_USERNAME</li>
    <li>DB_PASSWORD</li>
    <li>DB_NAME</li>
    <li>JWT_SECRET</li>
  </ul>
  <p>DB example : </p>
  <pre class="code-block">
    <code>
      DB_HOST='localhost'
      DB_PORT=5432
      DB_USERNAME='postgres'
      DB_PASSWORD='qweqwe'
      DB_NAME='rn'
      JWT_SECRET='209D8Uu9hijdkoioiugy78u90jhgytuiokl;ijulyhtUIKIKHYUTFRFyguhioI
      JHYUgtfrYGUhioJHYU'
    </code>
  </pre>
  <h4>Then run it:</h3>
  <ul>
    <li>cd server</li>
    <li>npm run start:dev</li>
  </ul>
  <h3>To start a client:</h3>
  <p>Create a .env file with variables like this</p>
  <ul>
    <li>VITE_URL (server url like http://localhost:8000/api/ )</li>
  </ul>
  <h4>Then run it:</h3>
  <ul>
    <li>cd client</li>
    <li>npm i </li>
    <li>npm run dev</li>
  </ul>
  <h3>
    List of technologies used :
  </h3>
  <h5>Server - </h5>
  <ul>
    <li>Node.js</li>
    <li>Nestjs</li>
    <li>Nestjs-passport</li>
    <li>PostgreSQL</li>
    <li>TypeORM</li>
    <li>JWT auth</li>
    <li>TypeScript</li>
  </ul>
  <h5>Client - </h5>
  <ul>
    <li>React</li>
    <li>tailwindcss</li>
    <li>React Forms</li>
    <li>ReduxToolKit</li>
    <li>Vite</li>
    <li>TypeScript</li>
  </ul>
</div>
