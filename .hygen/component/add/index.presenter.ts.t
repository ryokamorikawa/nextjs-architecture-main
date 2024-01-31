---
to: <%= presenterFilePath %>
skip_if: "<%= layer !== `Presenter`  %>"
unless_exists: true
---

'use client';
import { useState } from 'react';

/// パラメータのUseCase名は適宜修正してください
export const use<%= Name %> = (<%=  feature %>UseCaseInstance: <%=  feature %>UseCase) => {
  return {};
};