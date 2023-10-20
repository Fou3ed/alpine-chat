export function truncateMessage(message, maxLength) {
    if (message.length > maxLength) {
      return message.substring(0, maxLength) + "...";
    }
    return message;
  }

  export function insertLineBreaks(text) {
    const chunkSize = 30; 
    const chunks = text.match(new RegExp(`.{1,${chunkSize}}`, 'g'));
    return chunks.join('<br/>');
  }