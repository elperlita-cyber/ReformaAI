# 🏠 REFORMA AI - Guía Rápida

## ✨ NUEVA VERSIÓN - MUCHO MEJOR

Olvida los videos. Ahora el usuario **sube SU foto** y ve cómo quedaría con la reforma.

---

## 🎯 CÓMO FUNCIONA:

```
1. Usuario sube foto de SU salón/habitación
2. Elige efecto (Lava, Océano, Galaxia, Mármol, Madera, Moderno)
3. Elige color/variante
4. IA transforma ESA foto
5. Ve ANTES/DESPUÉS lado a lado
6. Descarga resultado
```

**Resultado:** Usuario ve EXACTAMENTE cómo quedaría su reforma en SU espacio.

---

## 🚀 INSTALACIÓN (2 minutos):

```bash
# 1. Crear carpeta
mkdir reforma-ai
cd reforma-ai

# 2. Copiar archivos:
# - reforma-ai.html → public/index.html
# - server-reforma-ai.js
# - package.json (el mismo de antes)
# - .env (con REPLICATE_API_TOKEN)

# 3. Estructura:
mkdir public
copy reforma-ai.html public\index.html

# 4. Instalar (si no lo hiciste)
npm install

# 5. Ejecutar
node server-reforma-ai.js
```

**Abre:** http://localhost:3000

---

## 🎨 EFECTOS DISPONIBLES:

### 🔥 Suelo de Lava
- Naranja (volcánico clásico)
- Rojo (carmesí intenso)  
- Azul (eléctrico futurista)

### 🌊 Suelo Océano 3D
- Turquesa (tropical)
- Azul (profundo)
- Cristal (transparente)

### 🌌 Suelo Galaxia
- Púrpura (nebulosa morada)
- Azul (espacio profundo)
- Rosa (nebulosa rosa)

### 💎 Mármol Luxury
- Blanco Carrara
- Negro elegante
- Verde natural

### 🪵 Madera Premium
- Roble natural
- Nogal oscuro
- Claro escandinavo

### ✨ Moderno Minimal
- Blanco puro
- Gris industrial
- Negro sofisticado

---

## 💡 VENTAJAS vs VIDEO:

| Aspecto | Video Generado | Foto Usuario |
|---------|----------------|--------------|
| **Utilidad** | Bajo | **MUY ALTA** ✅ |
| **Precisión** | Media | **Alta** ✅ |
| **Es su espacio** | ❌ No | **✅ SÍ** |
| **Toma decisión** | ❌ No | **✅ SÍ** |
| **Tiempo** | 3-6 min | **20 seg** ✅ |
| **Costo** | $0.12 | **$0.003** ✅ |
| **Coherencia** | Problemas | **Perfecta** ✅ |

---

## 📊 EJEMPLO DE USO:

### Usuario tiene un salón:
1. Saca foto con el móvil
2. Sube a Reforma AI
3. Elige "Suelo de Lava - Naranja"
4. **Ve su SALÓN con suelo de lava**
5. Decide: "¡Sí, quiero hacerlo!" o "No, no me gusta"

**Ahorra:** €20,000 de reforma que no le gustaba

---

## ⚡ CASOS DE USO REALES:

### 1. Particulares
- "Quiero ver cómo quedaría suelo de lava en mi salón"
- "¿Mármol blanco o negro en mi baño?"
- "Probar madera en la habitación"

### 2. Empresas de reformas
- Mostrar ejemplos a clientes
- "Así quedaría en TU casa"
- Cerrar más ventas

### 3. Diseñadores de interiores
- Presentar opciones a clientes
- Mockups rápidos
- Wow factor

---

## 💰 MODELO DE NEGOCIO:

### Freemium:
- **Gratis:** 1 transformación/día (con watermark)
- **Pro ($9.99/mes):** 50 transformaciones, sin watermark, HD
- **Business ($49/mes):** Ilimitadas, white-label, API

### Alternativa - Pago por uso:
- $0.99 por transformación
- $4.99 pack de 10
- $19.99 pack de 50

---

## 🎯 MEJORAS FUTURAS:

### V1.1 (próximo):
- [ ] Más efectos (jacuzzi, piscina, terraza)
- [ ] Múltiples variantes (3 resultados a la vez)
- [ ] Comparación A/B

### V1.2:
- [ ] Pincel para seleccionar zona exacta
- [ ] Ajuste de intensidad del efecto
- [ ] Previsualización antes de generar

### V1.3:
- [ ] Modo "antes/durante/después" (3 fases)
- [ ] Realidad aumentada (ver en tu espacio con el móvil)
- [ ] Estimación de coste real de la reforma

---

## 🐛 SOLUCIÓN DE PROBLEMAS:

### ❌ "No se ve la transformación"
- Aumenta `prompt_strength` a 0.85

### ❌ "Cambia demasiado el espacio"
- Reduce `prompt_strength` a 0.65

### ❌ "Resultado poco realista"
- Es normal con algunos efectos
- Prueba otro color/efecto

---

## ✅ CHECKLIST:

- [ ] Node.js instalado
- [ ] `npm install` ejecutado
- [ ] `.env` con REPLICATE_API_TOKEN
- [ ] `reforma-ai.html` en `public/index.html`
- [ ] Servidor ejecutándose: `node server-reforma-ai.js`
- [ ] http://localhost:3000 funciona

---

## 🚀 EMPEZAR:

```bash
node server-reforma-ai.js
```

Abre http://localhost:3000 y sube tu primera foto 📸

---

**¡MUCHO MÁS SIMPLE Y ÚTIL QUE EL VIDEO!** 🎉
