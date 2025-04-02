# Spaceworld

Spaceworld er en nettside hvor brukere kan utforske spill hentet fra IGDB API, søke etter spesifikke spill, og logge inn med Google eller Discord for å lagre favorittspillene sine, som vises på en egen side.

## Funksjonalitet

- **Søkefunksjon**: Søk etter alle tilgjengelige spill i IGDB-databasen.
- **Autentisering**: Logg inn med Google eller Discord for å bruke favoritt-funksjonaliteten.
- **Favoritter**: Legg til spill i favoritter, som lagres i brukerens konto og vises på en egen side.
- **Slideshow**: Bla gjennom kommende spill på startsiden.

## Teknologier brukt

- **Frontend**: Next.js (TypeScript), Shadcn, Tailwind CSS.
- **Backend**: Spring Boot (Kotlin).
- **Database**: PostgreSQL, hostet på Azure eller kjørt med Docker lokalt.
- **Autentisering**: NextAuth med støtte for Google og Discord.

## Deployments

Frontend og backend er hostet separat på Azure med autodeployment når noe blir pushet til main:
- Frontend: [spaceworld.azurewebsites.net](https://spaceworld.azurewebsites.net/)
- Backend: [spaceworld-springboot.azurewebsites.net](https://spaceworld-springboot.azurewebsites.net/)


