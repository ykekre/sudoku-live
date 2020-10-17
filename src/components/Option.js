import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  column: {
    flexBasis: "33.33%",
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
const Option = (props) => {
  const { selection, option, closeDrawer } = props;
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const handleClick = (e, id) => {
    selection(e, id);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Accordion
      expanded={expanded === option.id}
      onChange={handleChange(option.id)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${option.id}-content`}
        id={`${option.id}-header`}
      >
        <div className={classes.column}>
          <Typography className={classes.heading}>{option.text}</Typography>
        </div>
        <div className={classes.column}>
          <Typography className={classes.secondaryHeading}>
            {option.secondaryText}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Are you sure you? All progress will be lost</Typography>
      </AccordionDetails>
      <Divider />
      <AccordionActions>
        <Button
          size="small"
          color="secondary"
          onClick={(e) => setExpanded(false)}
        >
          Cancel
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={(e) => {
            handleClick(e, option.id);
            closeDrawer();
          }}
        >
          Yes
        </Button>
      </AccordionActions>
    </Accordion>
  );
};

export default Option;
