# Calendário de escala

Aplicação web para visualizar escalas de trabalho em um calendário mensal. Desenvolvida com React, Vite e [react-calendar](https://www.npmjs.com/package/react-calendar).

## Funcionalidades

- **Escala 3×3 (padrão):** 3 dias de trabalho seguidos de 3 dias de folga.
- **Escala 12×36:** 12 horas de trabalho + 36 horas de folga (ciclo de 48 horas).
- Clique em um dia para definir a **âncora** do ciclo:
  - **3×3:** o dia clicado é o primeiro dia de trabalho do bloco.
  - **12×36:** o dia clicado + hora de início do plantão marcam o início do plantão de 12 horas.
- Dias de trabalho e folga são destacados com cores no calendário.
- Interface em **português brasileiro (pt-BR)**.

## Instalação

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

Abra o endereço exibido no terminal (geralmente `http://localhost:5173`).

## Build de produção

```bash
npm run build
```

## Como funciona

### Escala 3×3

A partir da data âncora, o ciclo de 6 dias se repete:

| Posição | 0 | 1 | 2 | 3 | 4 | 5 |
|---------|---|---|---|---|---|---|
| Status  | Trabalho | Trabalho | Trabalho | Folga | Folga | Folga |

### Escala 12×36

A partir do horário âncora (data + hora de início do plantão), cada ciclo de 48 horas contém:

- **12 horas** de trabalho
- **36 horas** de folga

Um dia no calendário é marcado como **trabalho** se qualquer parte desse dia (00:00–24:00) intersecta um intervalo de plantão. Isso permite representar plantões que cruzam a meia-noite (por exemplo, 19:00–07:00).

No modo 12×36, ajuste o campo **Início do plantão** (padrão: 07:00) antes ou depois de clicar no dia âncora.

## Tecnologias

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [react-calendar](https://www.npmjs.com/package/react-calendar)
- [date-fns](https://date-fns.org/) (locale pt-BR)
