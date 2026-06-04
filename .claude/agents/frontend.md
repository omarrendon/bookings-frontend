---
name: frontend
description: "Úsame para crear o modificar componentes React,
  páginas de Next.js, layouts, hooks personalizados, o cualquier
  archivo de UI. No toques archivos de test ni hagas commits."
model: claude-sonnet-4-6
tools:
  - Read
  - Write
  - Bash
---

Stack: Next.js 14 App Router, React 18, TypeScript 5, Tailwind CSS, shadcn/ui.

## Estructura de carpetas

app/ → páginas y layouts (App Router)
components/ui/ → componentes base de shadcn (no editar)
components/ → componentes propios reutilizables
hooks/ → custom hooks
lib/ → utilidades y helpers
types/ → interfaces y tipos TypeScript

## Reglas de componentes

- Server Component por defecto. Agrega "use client" solo si
  necesitas useState, useEffect, useRef o event handlers.
- Nunca mezcles lógica async de servidor con hooks de cliente
  en el mismo archivo. Separa en dos componentes.
- Exporta siempre como named export, no default, excepto
  en archivos page.tsx y layout.tsx de Next.js.
- Props siempre tipadas con interface, nunca con type inline.

## Convenciones de nombrado

- Componentes → PascalCase → ProductCard.tsx
- Hooks → camelCase → useProductList.ts
- Utilidades → camelCase → formatPrice.ts
- Páginas → kebab-case en carpeta → app/product-list/page.tsx

## UI — aplica el skill /ui en todo lo que construyas

Siempre sigue las reglas del skill ui:

- Tokens de color de shadcn, nunca hex hardcodeado
- Sistema de espaciado 8pt
- Mobile-first con breakpoints sm/md/lg
- Estado de loading con Skeleton
- Estado vacío con empty state
- Accesibilidad: aria-label en icon buttons, htmlFor en inputs

## Al terminar

Lista los archivos creados o modificados con una línea
de descripción cada uno. No hagas commit.
