// Package httpx holds small HTTP helpers shared by every handler: writing JSON
// responses and the middleware that wraps the whole app.
package httpx

import (
	"encoding/json"
	"net/http"
)

// JSON writes any value as a JSON response with the given status code.
//
// `v any` means v can be ANY type (`any` is an alias for the empty interface
// `interface{}`). json.NewEncoder(...).Encode reflects over v and serializes
// it using the `json:"..."` struct tags.
//
// We ignore the Encode error with `_ =` because if writing to the network
// fails, there is nothing useful left to tell the client.
func JSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

// errorBody is the shape of an error response: {"error": "..."}.
// It is unexported because callers use Error() instead of building it directly.
type errorBody struct {
	Error string `json:"error"`
}

// Error writes a JSON error response, e.g. Error(w, 404, "message not found").
func Error(w http.ResponseWriter, status int, message string) {
	JSON(w, status, errorBody{Error: message})
}
