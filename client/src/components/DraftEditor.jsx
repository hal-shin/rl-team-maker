import React, { useRef } from "react";
import { Editor, RichUtils } from "draft-js";
import { makeStyles, Typography, Divider } from "@material-ui/core";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered
} from "@material-ui/icons";

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "Blockquote", style: "blockquote" },
  { label: FormatListBulleted, style: "unordered-list-item" },
  { label: FormatListNumbered, style: "ordered-list-item" }
];

const INLINE_STYLES = [
  { label: FormatBold, style: "BOLD" },
  { label: FormatItalic, style: "ITALIC" },
  { label: FormatUnderlined, style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

const useStyles = makeStyles(theme => ({
  root: {
    border: "1px solid lightgrey",
    borderRadius: 4,
    maxHeight: "600px",
    overflow: "hidden"
  },
  controls: {
    padding: theme.spacing(1)
  },
  toolbar: {
    display: "flex",
    marginBottom: theme.spacing(1)
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 36,
    marginRight: theme.spacing(1),
    padding: theme.spacing(0, 1),
    borderRadius: "4px",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      background: theme.palette.grey[200]
    },
    "& > *": {
      color: theme.palette.text.secondary,
      fontWeight: 500
    }
  },
  selected: {
    color: theme.palette.primary.main
  },
  editor: {
    padding: theme.spacing(0, 1, 2),
    minHeight: "200px",
    maxHeight: "460px",
    maxWidth: "inherit",
    cursor: "text",
    overflow: "scroll",
    overflowWrap: "break-word"
  }
}));

export default function DraftEditor({ editorState, setEditorState }) {
  const classes = useStyles();
  const editorRef = useRef(null);

  const focusEditor = () => {
    editorRef.current.focus();
  };

  const toggleBlockType = blockType => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = inlineStyle => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const renderIcon = (Jsx, active) => {
    return <Jsx className={active ? classes.selected : ""} />;
  };

  const StyleButton = ({ onToggle, label, style, active }) => {
    const handleToggle = event => {
      event.preventDefault();
      onToggle(style);
    };

    return (
      <div className={classes.button} onMouseDown={handleToggle}>
        {typeof label === "string" ? (
          <Typography
            variant="body1"
            className={active ? classes.selected : ""}
          >
            {label}
          </Typography>
        ) : (
          renderIcon(label, active)
        )}
      </div>
    );
  };

  const BlockStyleControls = () => {
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className={classes.toolbar}>
        {BLOCK_TYPES.map((type, index) => (
          <StyleButton
            key={`block-${index}`}
            active={type.style === blockType}
            onToggle={toggleBlockType}
            label={type.label}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  const InlineStyleControls = () => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return (
      <div className={classes.toolbar}>
        {INLINE_STYLES.map((type, index) => (
          <StyleButton
            key={`inline-${index}`}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={toggleInlineStyle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={classes.root} onClick={focusEditor}>
      <div className={classes.controls}>
        <BlockStyleControls />
        <InlineStyleControls />
        <Divider className={classes.toolbar} />
      </div>
      <div className={classes.editor}>
        <Editor
          ref={editorRef}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          placeholder="Enter your event description here..."
          onChange={setEditorState}
        />
      </div>
    </div>
  );
}
