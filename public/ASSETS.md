# 📁 Onde inserir as imagens, vídeos e fontes

Coloque cada arquivo **exatamente** no caminho abaixo (dentro de `public/`).
Enquanto um arquivo não existir, o site mostra um bloco elegante com o nome do
caminho esperado — nada quebra. Basta soltar o arquivo com o nome certo e ele
aparece automaticamente.

Formatos recomendados: **JPG/WebP** para fotos, **MP4/WebM** para vídeo, **WOFF2** para fontes.

---

## 🎬 Vídeo do hero (primeira seção)
| Arquivo | Caminho | Observações |
|---|---|---|
| Vídeo principal | `public/videos/hero.mp4` | ~10–20s, em loop. Ideal 1920×1080 (paisagem). |
| Vídeo (WebM opcional) | `public/videos/hero.webm` | Alternativa mais leve. |
| Poster/fallback | `public/images/hero/hero-poster.jpg` | Frame do vídeo. Usado no mobile e enquanto o vídeo carrega. 1920×1080. |

> ⚠️ **Peso do vídeo:** mantenha **abaixo de ~8–10 MB**. Vídeos muito grandes
> (dezenas/centenas de MB) deixam o site lento. Comprima antes de subir
> (ex.: [handbrake.fr](https://handbrake.fr) ou [freeconvert.com](https://www.freeconvert.com/video-compressor)).
>
> 🔇 **Áudio do vídeo:** o vídeo do hero toca **sem som** (mudo). Isso é uma
> exigência dos navegadores — vídeo com áudio não pode iniciar sozinho. O som do
> site é controlado separadamente pelo áudio ambiente (abaixo).

## 🔊 Áudio ambiente (som de fundo do site)
| Arquivo | Caminho | Observações |
|---|---|---|
| Trilha ambiente | `public/audio/ambient.mp3` | Em loop. ~1–3 min, volume suave, < 3 MB. |

> Um botão flutuante (canto inferior direito) liga/desliga o som e lembra a
> preferência. O áudio começa na **primeira interação** da pessoa com a página
> (clique/scroll) — os navegadores não deixam iniciar som antes disso.
> Se quiser usar o áudio do seu vídeo, **extraia a trilha** dele para
> `ambient.mp3` (qualquer editor ou conversor online faz isso).

## 🔤 Fontes da marca (licenciadas) — ✅ já instaladas
A família **completa** (com acentos e números) já está em `public/fonts/` e
ligada no CSS. O site usa:
- **Galano Classic** (texto) — pesos `Light/Regular/Medium/SemiBold/Bold/ExtraBold`
  + itálicos (`GalanoClassicRegular.otf`, `GalanoClassicBold.otf`, …).
- **Alga** (títulos/display) — `Extralight/Light/Medium/Semibold` + itálicos
  (`fonnts.com-Alga-Medium.otf`, `fonnts.com-Alga-Semibold-.otf`, …).

> ✅ **Acentos e números corrigidos.** A versão anterior era DEMO (glifos
> acentuados vazios → quadradinhos). A versão completa já resolve isso — nenhum
> ajuste é necessário. O navegador baixa apenas os pesos realmente usados.
> Se quiser deixar mais leve para web, dá para converter os `.otf` em `.woff2`
> (opcional).

## 🖼️ Logos (SVG de preferência)
| Arquivo | Caminho |
|---|---|
| Logo verde | `public/images/logo/logo-verde.svg` |
| Logo branco | `public/images/logo/logo-branco.svg` |
| Símbolo | `public/images/logo/simbolo.svg` |

## 🌿 Fotos das experiências
Proporção recomendada **4:5** (retrato), ~1000×1250px.

**Jornadas** — `public/images/experiences/jornadas/`
`amazonia.jpg` · `pedra-da-gavea.jpg` · `arpoador.jpg` · `pao-de-acucar.jpg` ·
`parque-lage.jpg` · `prainha.jpg` · `itacoatiara.jpg` · `spa-detox.jpg` ·
`arco-iris.jpg` · `celebrar.jpg`

**Terapias** — `public/images/experiences/terapias/`
`brisa.jpg` · `flow.jpg` · `toque-vulcanico.jpg` · `lumina.jpg` · `trama.jpg` ·
`sopro-restaurador.jpg` · `pureza.jpg` · `sal-e-ervas.jpg` · `celeridade.jpg` ·
`curva.jpg` · `aura.jpg` · `libelula.jpg` · `orla.jpg` · `equilibrio.jpg`

**Jornadas exclusivas — Hotel Venit** — `public/images/experiences/venit/` ✅ incluídas
`five-senses.png` · `sensorial-journey.png` · `renewal-ritual.png` ·
`body-soul-cleanse.png` · `memorial-moments.png`
*(proporção 4:5 — usadas na seção "Exclusivas do Hotel Venit" da página /jornadas.)*

**Hotel Venit — imagem da gastronomia (by Matera)** — `public/images/venit/`
`gastronomia.jpg` — foto lifestyle (ex.: o brinde no rooftop). Proporção **16:9**
(paisagem), ~1600×900px. Aparece na seção "Menu Sensória by Matera".

## 🎯 Fotos das Landing Pages (Terapias e Jornadas)
Imagens de destaque (hero) das páginas `/terapias` e `/jornadas` — também usadas
nos dois cartões "Dois caminhos" da Home. Proporção **paisagem** (16:9 ou 3:2),
~1920×1080px, com boa área escura para o texto branco ficar legível.

`public/images/lp/`
`terapias.jpg` · `jornadas.jpg`

## 📍 Fotos das unidades
Proporção **3:2** (paisagem), ~1200×800px. `public/images/units/`
`icarai.jpg` · `ipanema.jpg` · `leblon.jpg` · `peninsula.jpg` · `venit.jpg`

## 🧖 Institucional / Quem Somos
`public/images/about/`
`sobre-1.jpg` (4:5) · `sobre-2.jpg` (4:5) · `produtos.jpg` (4:5)

## ✨ Galeria (uso livre em home/sobre)
`public/images/gallery/`
`ambiente.jpg` (4:3) e demais fotos que quiser destacar.

## 🎋 Detalhe decorativo — skyline do Rio (Pão de Açúcar + Cristo)
`public/images/decor/`
`icone-rj.svg` — o desenho em linha (verde claro) que aparece **encostado na borda
inferior**, logo acima do rodapé, em todas as páginas. SVG de preferência (linha fina,
fundo transparente). Enquanto não existir, aparece só uma faixa branca discreta.

---

### Dica de otimização
Comprima as imagens antes de subir (ex.: [squoosh.app](https://squoosh.app)).
O Next.js já otimiza no build, mas arquivos leves melhoram o carregamento.
