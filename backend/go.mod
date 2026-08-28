// go.mod declares this folder as its own Go MODULE.
//
// A module is a collection of packages versioned together. The line below is
// the module PATH: it is the import prefix for every package inside. Because
// this app is internal (not published for `go get`), we use a short name.
//
// The `go` line pins the minimum Go language version. We need 1.22+ for the
// method-and-path routing in the standard library's http.ServeMux.
module newjerusalem

go 1.25.0

require github.com/jackc/pgx/v5 v5.10.0

require (
	github.com/jackc/pgpassfile v1.0.0 // indirect
	github.com/jackc/pgservicefile v0.0.0-20240606120523-5a60cdf6a761 // indirect
	github.com/jackc/puddle/v2 v2.2.2 // indirect
	golang.org/x/sync v0.17.0 // indirect
	golang.org/x/text v0.29.0 // indirect
)
