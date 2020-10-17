import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { GameContext } from "../contexts/game.context";
import "../styles/components/_dialogModal.scss";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles({
  root: {
    /*  backgroundColor: "#fae5b8d3",
    color: "#4c3b78cc", */
  },
});
function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        className={`${classes.root}`}
      >
        <div className="Dialog__container">
          <DialogTitle id="simple-dialog-title" className="Dialog__title">
            New Game
          </DialogTitle>
          <Typography variant="h4" gutterBottom className="Dialog__subheading">
            Select Puzzle Difficulty
          </Typography>
          <ButtonGroup
            variant="text"
            color="primary"
            aria-label="text primary button group"
            className="Dialog__button__group"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleListItemClick("easy")}
              className="button button--1"
            >
              Easy
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleListItemClick("medium")}
              className="button button--2"
            >
              Medium
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleListItemClick("hard")}
              className="button button--3"
            >
              Hard
            </Button>
          </ButtonGroup>
        </div>
      </Dialog>
    </>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SelectPuzzleTypeDialog({ startGame }) {
  const { gameState, startNewGame } = useContext(GameContext);

  const [open, setOpen] = React.useState(gameState.showModal);
  const [selectedValue, setSelectedValue] = React.useState("easy");

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);

    startNewGame(value);
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
