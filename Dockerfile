# Base images are pinned by tag + index digest, like pnpm in package.json's
# packageManager: Docker pulls the digest, the tag only documents it. Bump both
# together (Digest line of `docker buildx imagetools inspect <tag>`).

# =========
FROM node:24.22.1-alpine3.24@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53 AS build
WORKDIR /app
RUN corepack enable
ENV ASTRO_TELEMETRY_DISABLED=1

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# Sources are copied one by one, never with `COPY . .`: personal documents
# dropped at the repo root must not reach the build context's layers.
COPY astro.config.mjs tsconfig.json ./
COPY public public
COPY src src

RUN pnpm build


# =========
# slim variant: no optional modules (njs, image-filter...) nor curl, none of
# them used here, so far fewer libs to patch (e.g. no brotli).
FROM nginx:1.30.6-alpine3.24-slim@sha256:dede8895648b461178c3bc604f7eed4423efe5220b2c4d839f5eb3d34ac3f8f7 AS prod
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY docker/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
