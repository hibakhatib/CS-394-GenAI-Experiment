import { html, LitElement } from 'lit';
import './editable-text';

class MyPage extends LitElement {
  async firstUpdated() {
    const response = await fetch('http://localhost:3000/get-text?docId=your-doc-id');
    const data = await response.json();
    const editableElements = this.shadowRoot.querySelectorAll('editable-text');
    editableElements.forEach((element, index) => {
      (element as any).text = data.texts[index];
    });
  }

  render() {
    return html`
      <h1><editable-text text="Loading..." @text-updated="${this._saveText}"></editable-text></h1>
      <p><editable-text text="Loading..." @text-updated="${this._saveText}"></editable-text></p>
    `;
  }

  async _saveText(e: CustomEvent) {
    const updatedText = e.detail;
    try {
      await fetch('http://localhost:3000/update-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          docId: 'your-doc-id',
          text: updatedText,
        }),
      });
    } catch (error) {
      console.error('Error updating text:', error);
    }
  }
}

customElements.define('my-page', MyPage);
