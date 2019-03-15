export default class renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}