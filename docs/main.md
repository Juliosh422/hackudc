# INDITEX APP

> [!IMPORTANT]
>
> ## Límites y errores
>
> **Límite de uso:** La API tiene un límite de peticiones, configurable en el portal.
> **Errores comunes:**
>
> - **400:** Parámetros incorrectos.
> - **401:** Falta de autenticación.
> - **404:** No se encontraron productos similares.
> - **429:** Exceso de peticiones.

## Importante

> [!NOTE]
>
> ## Casos de uso
>
> - **Aplicaciones móviles/web** que permitan buscar ropa similar a partir de fotos.  
> - **Extensiones de navegador** o herramientas para comparar productos de Zara con otros.  
> - **Plataformas de recomendación de moda** basadas en imágenes.  

algo

> [!NOTE]
>
> ## Autenticación
>
> - Se utiliza **OAuth2**.
> - Primero, hay que registrarse en el **Inditex Developer Portal**.
> - Luego, se debe crear una aplicación y agregar esta API.
> - Se obtiene un **JWT token** que permite hacer llamadas a la API.

algo

> [!NOTE]
>
> ## Parámetros
>
> - **image**: URL de la imagen *(máximo 7 MB)* **(obligatorio)**.  
> - **page**: Número de página *(opcional, por defecto: 1)*.  
> - **perPage**: Número de productos por página *(opcional, por defecto: 5)*.  
