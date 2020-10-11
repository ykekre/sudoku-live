import React, { useContext } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { GameContext } from "../contexts/game.context";
function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">New Puzzle</DialogTitle>
      <List>
        <ListItem
          button
          onClick={() => handleListItemClick("easy")}
          key={"easy"}
        >
          <ListItemText primary={"Easy"} />
        </ListItem>

        <ListItem
          button
          onClick={() => handleListItemClick("medium")}
          key={"medium"}
        >
          <ListItemText primary={"Medium"} />
        </ListItem>

        <ListItem
          button
          onClick={() => handleListItemClick("hard")}
          key={"hard"}
        >
          <ListItemText primary={"Hard"} />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SelectPuzzleTypeDialog({ startGame }) {
  const { gameState } = useContext(GameContext);

  const [open, setOpen] = React.useState(gameState.showModal);
  const [selectedValue, setSelectedValue] = React.useState("easy");
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);

    startGame(value);
  };

  return (
    <div>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}