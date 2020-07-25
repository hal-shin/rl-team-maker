import React from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";

function DraftRenderer({ editorState }) {
  const storedState = convertFromRaw(JSON.parse(editorState));

  return (
    <div>
      <Editor
        editorState={EditorState.createWithContent(storedState)}
        readOnly={true}
      />
    </div>
  );
}

export default DraftRenderer;
