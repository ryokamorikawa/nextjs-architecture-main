---
to: <%= useCaseFilePath %>
skip_if: "<%= layer !== `UseCases` %>"
unless_exists: true
---

/// クラス名、インターフェース名は適宜修正してください
export interface <%=  Name %>Repository {
    
}

export class <%= Name %>UseCase {

}