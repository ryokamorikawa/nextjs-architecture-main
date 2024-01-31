---
to: <%= testFilePath %>
skip_if: "<%= componentName  !== `` %>"
unless_exists: true
---
<% if (layer == `Presenter`) { %>
/**
 * @jest-environment jsdom
 */
<%}%>
import { describe, expect, test } from '@jest/globals';

describe('', () => {
  test('', () => {
    expect();
  });
});