# 🧠 3-in-1 Frontend Productivity Suite

> A React + TypeScript application combining three power-packed tools:
> ✅ Task Manager, 📊 Dashboard, and 🖍 MRI Annotation.

---

## 🧟‍♂️ Villains I Faced (and How I Defeated Them)

Throughout this project, the biggest villain I encountered was the chaotic beast known as State Desync — especially when building the annotation tool. Managing zoom, pan, and polygon drawing on a <canvas> while syncing that with React state felt like a battle against invisible forces. Sometimes the image wouldn’t load, sometimes the polygons wouldn’t render after zooming, and sometimes my canvas would straight-up give me the silent treatment.

But every villain has a weakness.

Armed with the power of documentation, blog deep dives, and of course, the friendship of ChatGPT, I dissected the canvas lifecycle and React render behavior. I learned how to batch drawing operations and refactor side-effects using useEffect smartly. I also had to carefully design my coordinate transformation logic to make zooming and panning feel smooth — not like you're trying to draw on a trampoline.

---

## 🧪 Requirements & Environment

- **Node Version**: `v18.17.1`
- **Package Manager**: `npm` (or `pnpm`/`yarn` if preferred)
- **Framework**: React with Vite + TypeScript
- **CSS**: Tailwind CSS

---

## 🚀 How to Run the Project

```bash
# 1. Clone the repository
git clone https://github.com/soyebcodes/404-frontend

cd 3in1-productivity-app

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

# The app will be available at:
# http://localhost:5173
```
