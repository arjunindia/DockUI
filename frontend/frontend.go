package frontend

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
)

//go:embed dist
var DistFS embed.FS

// Get the subtree of the embedded files with `dist` directory as a root.
func BuildHTTPFS() http.FileSystem {
	build, err := fs.Sub(DistFS, "dist")
	if err != nil {
		log.Fatal(err)
	}
	return http.FS(build)
}
