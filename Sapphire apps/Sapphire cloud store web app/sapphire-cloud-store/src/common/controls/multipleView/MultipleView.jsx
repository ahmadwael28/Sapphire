import React from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import PropTypes from "prop-types";

export const MultipleViews = ({
  currentViewIndex,
  views,
  containerClassName,
  viewClassName,
}) => {
  return (
    <Box className={`${containerClassName ? containerClassName : ""}`}>
      {views.length && (
        <TabContext value={currentViewIndex}>
          {views.map((view, index) => {
            return (
              <TabPanel
                value={index}
                className={`${viewClassName ? viewClassName : ""}`}
              >
                {view}
              </TabPanel>
            );
          })}
        </TabContext>
      )}
    </Box>
  );
};

MultipleViews.propTypes = {
  currentViewIndex: PropTypes.number,
  views: PropTypes.array,
  containerClassName: PropTypes.string,
};

MultipleViews.defaultProps = {
  currentViewIndex: 0,
  views: [],
  containerClassName: "",
};
