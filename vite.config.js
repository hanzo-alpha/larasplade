import fs from "fs";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import {homedir} from "os";
import {resolve} from "path";

let host = "larasplade.local";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.js",
            ssr: "resources/js/ssr.js",
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    ssr: {
        noExternal: ["vue", "@protonemedia/laravel-splade"]
    },
    server: detectServerConfig(host),
});

function detectServerConfig(host) {
    let keyPath = resolve(
        homedir(),
        "D:/Development/laragon/etc/ssl/laragon.key"
    );
    let certificatePath = resolve(
        homedir(),
        "D:/Development/laragon/etc/ssl/laragon.crt"
    );

    if (!fs.existsSync(keyPath)) {
        return {};
    }

    if (!fs.existsSync(certificatePath)) {
        return {};
    }

    return {
        hmr: {host},
        host,
        https: {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certificatePath),
        },
    };
}
