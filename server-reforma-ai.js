// server-reforma-ai.js - Transforma la foto del usuario
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Replicate = require('replicate');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/generated', express.static('generated'));

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

console.log(`
╔═══════════════════════════════════════════════╗
║                                               ║
║     🏠 REFORMA AI                             ║
║                                               ║
║     Transforma TU foto con IA                 ║
║     Ve cómo quedaría ANTES de gastar          ║
║                                               ║
╚═══════════════════════════════════════════════╝
`);

// Prompts optimizados por efecto
const effectPrompts = {
    lava: {
        orange: "transform this floor into stunning molten lava effect with bright orange epoxy resin, glowing volcanic cracks, lava flowing pattern, high gloss finish, ultra realistic, keep everything else exactly the same",
        red: "transform this floor into crimson red lava effect with deep red epoxy resin, glowing red volcanic cracks, dramatic lava pattern, glossy surface, ultra realistic, keep walls and windows unchanged",
        blue: "transform this floor into electric blue lava effect with cyan epoxy resin, glowing blue volcanic cracks, futuristic lava pattern, glossy finish, ultra realistic, preserve original room structure"
    },
    ocean: {
        turquoise: "transform this floor into stunning 3D ocean floor with crystal turquoise water epoxy resin, tropical coral reef underneath, bright aqua blue color, transparent clear water effect, keep everything else unchanged",
        blue: "transform this floor into deep blue 3D ocean effect with dark blue epoxy resin, underwater coral reef, marine life, realistic water depth, keep original room exactly the same",
        crystal: "transform this floor into crystal clear ocean 3D effect, transparent epoxy with light blue tint, white beach sand underneath, tropical water, keep walls and ceiling unchanged"
    },
    galaxy: {
        purple: "transform this floor into stunning purple galaxy space effect with dark purple nebula, bright stars, cosmic dust, glowing purple clouds, epoxy resin finish, keep everything else the same",
        blue: "transform this floor into deep blue galaxy effect with dark blue nebula clouds, bright stars, cosmic space, glowing blue accents, glossy epoxy, preserve original room",
        pink: "transform this floor into pink galaxy space with rose nebula clouds, glowing stars, cosmic pink and purple colors, space effect, keep room structure unchanged"
    },
    marble: {
        white: "transform this floor into luxury white Carrara marble with elegant grey veins, polished glossy finish, natural marble pattern, high-end appearance, keep walls and everything else exactly the same",
        black: "transform this floor into elegant black marble with white and gold veins, polished mirror finish, luxury appearance, sophisticated pattern, preserve original room structure",
        green: "transform this floor into stunning green marble with natural veining, polished finish, elegant luxury appearance, keep everything else unchanged"
    },
    wood: {
        oak: "transform this floor into beautiful natural oak hardwood parquet, warm brown tones, wood grain texture, herringbone pattern, matte finish, keep walls and room exactly the same",
        walnut: "transform this floor into rich dark walnut hardwood flooring, deep brown color, natural wood grain, elegant pattern, preserve original room structure",
        light: "transform this floor into light blonde wood flooring, natural pale oak, Scandinavian style, clean modern look, keep everything else unchanged"
    },
    modern: {
        white: "transform this room into modern minimalist white interior, clean white walls, polished concrete floor, minimal design, bright and spacious, contemporary style",
        gray: "transform this room into modern industrial style with dark grey concrete, exposed elements, contemporary minimalist design, sophisticated color scheme",
        black: "transform this room into ultra-modern black interior, sleek dark surfaces, minimalist contemporary design, dramatic and elegant"
    }
};

// Endpoint principal
app.post('/api/transform', upload.single('image'), async (req, res) => {
    try {
        const { effect, color } = req.body;
        const imageFile = req.file;

        if (!imageFile || !effect || !color) {
            return res.status(400).json({
                success: false,
                error: 'Faltan parámetros'
            });
        }

        console.log(`\n🎨 Transformación solicitada: ${effect} - ${color}`);
        console.log(`📸 Imagen usuario: ${imageFile.filename}`);

        // Leer imagen
        const imageBuffer = fs.readFileSync(imageFile.path);
        const imageBase64 = `data:${imageFile.mimetype};base64,${imageBuffer.toString('base64')}`;

        // Obtener prompt
        const prompt = effectPrompts[effect]?.[color];
        if (!prompt) {
            throw new Error('Combinación de efecto/color inválida');
        }

        console.log(`🤖 Prompt: ${prompt.substring(0, 80)}...`);
        console.log(`⏳ Generando transformación...`);

        // Generar con img2img
        const output = await replicate.run(
            "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
            {
                input: {
                    image: imageBase64,
                    prompt: prompt,
                    negative_prompt: "blurry, low quality, distorted, deformed, ugly, bad architecture, different room, changed walls, changed windows, people, faces, text, watermark, multiple rooms, inconsistent lighting",
                    prompt_strength: 0.75, // Transformación fuerte pero mantiene estructura
                    num_outputs: 1,
                    num_inference_steps: 50, // Alta calidad
                    guidance_scale: 12, // Sigue bien el prompt
                    scheduler: "DPMSolverMultistep"
                }
            }
        );

        console.log('✅ Transformación generada');

        // Guardar resultado
        const resultUrl = Array.isArray(output) ? output[0] : output;
        const generatedDir = './generated';
        
        if (!fs.existsSync(generatedDir)) {
            fs.mkdirSync(generatedDir, { recursive: true });
        }

        const outputFilename = `transformed-${Date.now()}.png`;
        const outputPath = path.join(generatedDir, outputFilename);

        const resultResponse = await axios.get(resultUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(outputPath, resultResponse.data);
        
        console.log('✅ Guardado:', outputFilename);
        console.log('💰 Costo: $0.003\n');

        res.json({
            success: true,
            data: {
                originalImage: `/uploads/${imageFile.filename}`,
                transformedImage: `/generated/${outputFilename}`,
                effect: effect,
                color: color,
                cost: '$0.003'
            }
        });

    } catch (error) {
        console.error('❌ Error:', error.message);
        
        let hint = '';
        if (error.message.includes('429')) {
            hint = 'Límite de tasa. Espera 1 minuto.';
        } else if (error.message.includes('API key')) {
            hint = 'Verifica REPLICATE_API_TOKEN en .env';
        }
        
        res.status(500).json({
            success: false,
            error: error.message,
            hint: hint
        });
    }
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        version: 'reforma-ai v1.0',
        replicate: !!process.env.REPLICATE_API_TOKEN
    });
});

// Limpiar archivos antiguos
function cleanOldFiles() {
    const dirs = ['./uploads', './generated'];
    const maxAge = 24 * 60 * 60 * 1000;
    
    dirs.forEach(dir => {
        if (fs.existsSync(dir)) {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const filePath = path.join(dir, file);
                try {
                    const stats = fs.statSync(filePath);
                    if (Date.now() - stats.mtime.getTime() > maxAge) {
                        fs.unlinkSync(filePath);
                    }
                } catch (e) {}
            });
        }
    });
}

setInterval(cleanOldFiles, 60 * 60 * 1000);

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║                                               ║
║     🚀 REFORMA AI - SERVIDOR INICIADO         ║
║                                               ║
║     📡 URL: http://localhost:${PORT}             ║
║                                               ║
║     🎯 FUNCIONAMIENTO:                        ║
║     1. Usuario sube SU foto                   ║
║     2. Elige efecto (lava, océano, etc.)      ║
║     3. IA transforma ESA foto                 ║
║     4. Ve ANTES/DESPUÉS de su espacio         ║
║                                               ║
║     💰 Costo: $0.003 por transformación       ║
║     ⏱️  Tiempo: 15-25 segundos                ║
║                                               ║
╚═══════════════════════════════════════════════╝
    `);
    
    console.log('\n✨ Efectos disponibles:');
    console.log('   🔥 Suelo de Lava (naranja, rojo, azul)');
    console.log('   🌊 Suelo Océano 3D (turquesa, azul, cristal)');
    console.log('   🌌 Suelo Galaxia (púrpura, azul, rosa)');
    console.log('   💎 Mármol Luxury (blanco, negro, verde)');
    console.log('   🪵 Madera Premium (roble, nogal, claro)');
    console.log('   ✨ Moderno Minimal (blanco, gris, negro)\n');
});
