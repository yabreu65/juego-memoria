# 🎮 Memory Master - Premium Memory Game

Un juego de memoria profesional desarrollado con Vue 3, Vite y Tailwind CSS. Diseño premium minimalista perfecto para portafolios de desarrolladores frontend.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)
![Vite](https://img.shields.io/badge/Vite-3.x-646CFF.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg)

## ✨ Características

- **🎨 Diseño Premium**: Paleta de colores moderna y profesional con modo oscuro
- **⚡ Rendimiento Optimizado**: Build estático con code splitting y lazy loading
- **♿ Accesible**: ARIA labels, contraste adecuado y navegación por teclado
- **📱 Responsive**: Diseño adaptable a todos los dispositivos
- **🎯 UX Excepcional**: Animaciones suaves, skeleton loaders y transiciones fluidas
- **🔧 Modular**: Código limpio y componentizado fácil de mantener
- **🚀 Listo para Producción**: Configurado para Vercel con optimizaciones

## 🎮 Niveles de Dificultad

1. **Fácil** - 12 pares (24 cartas)
2. **Medio** - 18 pares (36 cartas)
3. **Difícil** - 24 pares (48 cartas)

## 🛠️ Tecnologías

- **Frontend Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Estilos**: Tailwind CSS
- **Routing**: Vue Router 4
- **API Externa**: PokeAPI
- **Deploy**: Vercel

## 📦 Instalación

```bash
# Clonar repositorio
git clone <repository-url>

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env
```

## 🚀 Desarrollo

```bash
# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 📂 Estructura del Proyecto

```
src/
├── api/              # API stubs para backend futuro
│   └── game.js
├── components/
│   ├── base/         # Componentes reutilizables
│   │   ├── BaseButton.vue
│   │   ├── BaseCard.vue
│   │   ├── BaseModal.vue
│   │   └── SkeletonLoader.vue
│   ├── game/         # Componentes del juego
│   │   ├── MemoryCard.vue
│   │   ├── GameTimer.vue
│   │   └── GameStats.vue
│   ├── Home.vue      # Página principal
│   └── Game.vue      # Página del juego
├── composables/      # Composables de Vue
│   ├── useMemoryGame.js
│   └── useTimer.js
├── router.js         # Configuración de rutas
├── style.css         # Estilos globales Tailwind
└── main.js           # Punto de entrada
```

## 🎨 Paleta de Colores

```css
Acento Principal: #4F46E5
Secundario:      #6366F1
Fondo Oscuro:    #0F172A
Fondo Claro:     #F8FAFC
Texto Oscuro:    #1E293B
Texto Claro:     #E2E8F0
```

## 🔮 Próximas Funcionalidades

- [ ] Integración con backend real
- [ ] Sistema de usuarios y autenticación
- [ ] Tabla de clasificación global
- [ ] Estadísticas detalladas
- [ ] Modo multijugador
- [ ] Temas personalizables
- [ ] Sonidos y efectos

## 📱 Deploy en Vercel

1. Push al repositorio
2. Conectar con Vercel
3. Deploy automático en cada push

```bash
# O usando Vercel CLI
npm i -g vercel
vercel
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

MIT License - siéntete libre de usar este proyecto para tu portafolio.

## 👤 Autor

Desarrollado con ❤️ como proyecto de portafolio profesional.

---

**Aprende y juega con un diseño que vende ingeniería real.**
