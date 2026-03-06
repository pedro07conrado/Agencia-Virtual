# Agencia Virtual

Projeto de desenvolvimento pessoal criado como parte do processo de evolução técnica para ingresso no squad de Canais Digitais da BRK. A aplicação simula uma agência virtual de água e esgoto, replicando funcionalidades presentes no portal oficial da BRK.

---

## Tecnologias Utilizadas

**Backend**
- Java 17 (Eclipse Temurin)
- Spring Boot 3
- Spring Data JPA
- Flyway
- MySQL 8.0

**Frontend**
- Angular
- TypeScript
- Node.js

---

## Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado na sua máquina:

- [JDK 17 (Eclipse Temurin)](https://adoptium.net)
- [MySQL 8.0](https://dev.mysql.com/downloads/installer)
- [Node.js](https://nodejs.org)
- Angular CLI: `npm install -g @angular/cli`

---

## Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/agencia-virtual.git
cd agencia-virtual
```

### 2. Configure o banco de dados

Certifique-se de que o MySQL está rodando e crie uma conexão com as seguintes credenciais (ou ajuste o `application.properties` conforme o seu ambiente):

```
Host: 127.0.0.1
Porta: 3306
Usuário: root
Senha: root
```

O banco `agencia_virtual` será criado automaticamente na primeira execução.

### 3. Rode o backend

```bash
cd backend
.\mvnw spring-boot:run
```

O servidor estará disponível em `http://localhost:8080`.

### 4. Rode o frontend

```bash
cd frontend
npm install
ng serve --proxy-config proxy.conf.json
```

A aplicação estará disponível em `http://localhost:4200`.

---

## Configuração do application.properties

```properties
spring.application.name=agencia-virtual-backend
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/agencia_virtual?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.hibernate.ddl-auto=update
spring.jpa.open-in-view=false
```
