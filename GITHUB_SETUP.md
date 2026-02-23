# Conectar este proyecto con GitHub

## 0. Configurar tu nombre y email en Git (recomendado)

Para que tus commits tengan tu identidad (sustituye por tus datos):

```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

## 1. Completar la instalación de Git (si aplica)

Si acabas de instalar Git con winget:

- **Cierra y vuelve a abrir** la terminal (o Cursor) para que se actualice el PATH.
- Si te salió una ventana de instalación de Git, **acéptala** (puede pedir permisos de administrador).

Comprueba que Git funciona:

```powershell
git --version
```

## 2. Inicializar el repositorio

En la carpeta del proyecto (`cursor emi`) ejecuta:

```powershell
.\conectar-github.ps1
```

El script:

- Inicializa Git en esta carpeta (si no está ya).
- Te pide nombre y email para Git si no los tienes configurados.
- Crea el primer commit si hay archivos.

## 3. Crear el repositorio en GitHub

1. Entra en **https://github.com/new**
2. Pon un nombre al repositorio (ej: `cursor-emi`).
3. No marques “Add a README” ni “Add .gitignore”.
4. Clic en **Create repository**.

## 4. Enlazar este proyecto con GitHub

En la misma carpeta, en PowerShell (sustituye `TU_USUARIO` y `NOMBRE_REPO` por los tuyos):

```powershell
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPO.git
git branch -M main
git push -u origin main
```

## 5. Iniciar sesión en GitHub (primera vez)

La primera vez que hagas `git push`, Windows puede abrir el **Git Credential Manager** o el navegador para que inicies sesión en GitHub. Elige “Sign in with your browser” y autoriza. Después de eso, no tendrás que volver a iniciar sesión para push/pull.

**Alternativa con token (Personal Access Token):**

1. GitHub → Settings → Developer settings → Personal access tokens → Generate new token.
2. Marca al menos el permiso `repo`.
3. Cuando Git pida contraseña en `git push`, pega el token (no tu contraseña de GitHub).

## 6. Activar GitHub Pages (para este proyecto)

1. En tu repositorio en GitHub: **Settings** → **Pages**.
2. En **Source** elige **GitHub Actions**.
3. Cada vez que hagas `git push` a `main`, el workflow desplegará la web en `https://TU_USUARIO.github.io/NOMBRE_REPO/`.

---

Resumen rápido después de tener Git en el PATH:

```powershell
.\conectar-github.ps1
# Crear repo en github.com/new, luego:
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPO.git
git branch -M main
git push -u origin main
```
