import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

class EditableText extends LitElement {
  @property({ type: String }) text = '';
  @property({ type: Boolean }) editing = false;

  static styles = css`
    :host {
      display: block;
    }
    .editable {
      cursor: pointer;
      border: 1px dashed transparent;
    }
    .editable:hover {
      border: 1px dashed #ccc;
    }
    input {
      width: 100%;
      box-sizing: border-box;
    }
  `;

  render() {
    return this.editing
      ? html`<input type="text" .value="${this.text}" @blur="${this._save}" @input="${this._updateText}" />`
      : html`<span class="editable" @click="${this._edit}">${this.text}</span>`;
  }

  _edit() {
    this.editing = true;
  }

  _updateText(e: Event) {
    this.text = (e.target as HTMLInputElement).value;
  }

  async _save() {
    this.editing = false;
    this.dispatchEvent(new CustomEvent('text-updated', { detail: this.text }));
    try {
      await fetch('http://localhost:3000/update-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          docId: 'your-doc-id',
          text: this.text,
        }),
      });
    } catch (error) {
      console.error('Error updating text:', error);
    }
  }
}

customElements.define('editable-text', EditableText);
