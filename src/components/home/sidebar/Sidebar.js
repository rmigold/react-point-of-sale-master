import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import { withStyles } from "material-ui/styles";
import Hidden from "material-ui/Hidden";
import Drawer from "material-ui/Drawer";
import ShoppingCart from "material-ui-icons/ShoppingCart";
import Divider from "material-ui/Divider";
import Menus from "./Menus";

const drawerWidth = 200;

// eslint-disable-next-line
const styles = theme => ({
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    },
    height: "calc(100vh - 1px)",
    borderBottom: "1px solid #e0e0e0"
class Sidebar extends Component {
  renderMenus = () => {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.logo}>
          <div className={classes.logoContainer}>
            <ShoppingCart />
            <span>Point Of Sale</span>
          </div>
        </div>
        <Divider />
        <Menus />
      </div>
    );
  };

  renderPermamentDrawer = () => {
    const { classes } = this.props;

    if (this.props.history.location.pathname === "/sale") {
      return null;
    }

    return (
      <Drawer
        variant="permanent"
        open
        classes={{
          paper: classes.drawerPaper
        }}
      >
        {this.renderMenus()}
      </Drawer>
    );
  };

  renderSlidingDrawer = () => {
    const { classes, theme, mobileOpen, handleDrawerToggle } = this.props;

    return (
      <Drawer
        variant="temporary"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {this.renderMenus()}
      </Drawer>
    );
  };

  renderSlidingDrawerForSale = () => {
    const { classes, theme, mobileOpen, handleDrawerToggle } = this.props;

    const isSale = this.props.history.location.pathname === "/sale";

    if (isSale === false) {
      return null;
    }

    return (
      <Drawer
        variant="temporary"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper2
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {this.renderMenus()}
      </Drawer>
    );
  };

  render() {
    return (
      <Fragment>
        {/* MEDIUM SCREENS */}
        <Hidden mdUp>{this.renderSlidingDrawer()}</Hidden>

        {/* For sale */}
        {this.renderSlidingDrawerForSale()}

        {/* Default - LARGER SCREENS */}
        <Hidden smDown implementation="css">
          {this.renderPermamentDrawer()}
        </Hidden>
      </Fragment>
    );
  }
}

Sidebar.defaultProps = {
  mobileOpen: false
};

const component = withStyles(styles, { withTheme: true })(Sidebar);

export default withRouter(component);