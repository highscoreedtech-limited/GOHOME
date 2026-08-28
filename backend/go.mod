// go.mod declares this folder as its own Go MODULE.
//
// A module is a collection of packages versioned together. The line below is
// the module PATH: it is the import prefix for every package inside. Because
// this app is internal (not published for `go get`), we use a short name.
//
// The `go` line pins the minimum Go language version. We need 1.22+ for the
// method-and-path routing in the standard library's http.ServeMux.
module newjerusalem

go 1.23
