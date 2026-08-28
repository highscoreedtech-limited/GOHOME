// Package config loads runtime settings from environment variables.
//
// In Go, a FILE begins with `package <name>`. All files in a folder must share
// the same package name; together they form one package. Code in the folder
// `internal/` can only be imported by code inside this module, which is a nice
// built-in way to keep internals private.
package config

import "os"

// Config holds everything the app needs to start.
//
// A `struct` is a typed record: a bundle of named fields. Field names that
// start with a CAPITAL letter are "exported" (visible to other packages);
// lowercase names are package-private. This is Go's entire access-control
// system: capitalization.
type Config struct {
	Port          string
	AllowedOrigin string // the frontend origin allowed to call us (CORS)
}

// Load reads configuration, falling back to sensible defaults for local dev.
//
// Go functions can return multiple values, but here we return just one. The
// return type comes AFTER the parameter list.
func Load() Config {
	return Config{
		Port:          env("PORT", "8080"),
		AllowedOrigin: env("ALLOWED_ORIGIN", "http://localhost:3000"),
	}
}

// env returns the value of an environment variable, or a default if unset.
// Lowercase name => this helper is private to the config package.
func env(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
