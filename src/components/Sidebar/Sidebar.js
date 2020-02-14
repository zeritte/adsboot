import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as DashboardIcon,
  NotificationsNone as KeywordsIcon,
  BorderAll as CampaignsIcon,
  FilterNone as AdsIcon,
  FormatSize as TextAdsGeneratorIcon,
  QuestionAnswer as ProjectParamsIcon,
  LibraryBooks as TokensIcon,
  HelpOutline as FeedIcon,
  ArrowBack as ArrowBackIcon,
  Computer as AdGroupsIcon,
  Report as ReportIcon,
  Gavel as RulesIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

import { useSelector, useDispatch } from "react-redux";
import { selectProject } from "../../actions";

const baseStructure = [
  {
    id: 0,
    label: "Dashboard",
    link: "/app/dashboard",
    icon: <DashboardIcon />,
  },
  { id: 13, label: "Tokens", link: "/app/tokens", icon: <TokensIcon /> },
  {
    id: 14,
    label: "Project Parameters",
    link: "/app/project_params",
    icon: <ProjectParamsIcon />,
  },
  {
    id: 1,
    label: "Campaigns",
    link: "/app/campaigns",
    icon: <CampaignsIcon />,
  },
  { id: 15, label: "Ad Groups", link: "/app/adgroups", icon: <AdGroupsIcon /> },
  { id: 16, label: "Ads", link: "/app/ads", icon: <AdsIcon /> },
  // {
  //   id: 1,
  //   label: "Campaigns",
  //   link: "/app/typography",
  //   icon: <CampaignsIcon />,
  // },
  {
    id: 2,
    label: "Text Ads Generator",
    link: "/app/text_ads_generator",
    icon: <TextAdsGeneratorIcon />,
  },
  {
    id: 3,
    label: "Keywords",
    link: "/app/keywords",
    icon: <KeywordsIcon />,
  },
  { id: 4, label: "Feed", link: "/app/feed", icon: <FeedIcon /> },
  { id: 7, label: "Report", link: "/app/report", icon: <ReportIcon /> },
  { id: 5, label: "Rules", link: "/app/rules", icon: <RulesIcon /> },
  // { id: 6, label: "Form Parameters", link: "", icon: <ProjectParamsIcon /> },
  // { id: 8, label: "History", link: "", icon: <AdsIcon /> },
  { id: 9, type: "divider" },
  { id: 10, type: "title", label: "Project List" },
  // {
  //   id: 12,
  //   label: "Feed",
  //   link: "/app/ui",
  //   icon: <AdsIcon />,
  //   children: [
  //     { label: "Icons", link: "/app/ui/icons" },
  //     { label: "Charts", link: "/app/ui/charts" },
  //     { label: "Maps", link: "/app/ui/maps" },
  //   ],
  // },
];

function Sidebar(props) {
  const { location } = props;
  const projects = useSelector(state => state.ad.projects);
  const selectedProjectId = useSelector(state => state.ad.selectedProjectId);
  const dispatch = useDispatch();
  var classes = useStyles();
  var theme = useTheme();

  const structure = [
    ...baseStructure,
    ...projects.map(p => ({
      id: p.projectId,
      label: p.projectName,
      link: () => dispatch(selectProject(p.projectId)),
      icon: (
        <Dot
          size="large"
          color={p.projectId === selectedProjectId ? "secondary" : "gray"}
        />
      ),
    })),
  ];

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
