---
to: <%= repositoryFilePath %>
skip_if: "<%= layer !== `Repositories` %>"
unless_exists: true
---

/// クラス名、インターフェース名は適宜修正してください
export class <%= Name %>Repository implements <%= Name %>Repository {

}