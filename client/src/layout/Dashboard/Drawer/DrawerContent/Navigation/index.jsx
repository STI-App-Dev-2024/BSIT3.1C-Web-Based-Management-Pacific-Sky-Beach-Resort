// material-ui
import Box from '@mui/material/Box';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const userRole = 'POSITIONS_MASTER_ADMIN';

  const navGroups = menuItem.items
    .filter((item) => {
      // Filter navigation groups that have access for the user's role
      if (item?.access?.includes(userRole)) {
        // Filter the children (items) within the group based on access
        const filteredChildren = item.children?.filter((child) =>
          child.access?.includes(userRole)
        );

        // If the group has no children or no filtered children, remove it
        if (!filteredChildren?.length) {
          return false; // Exclude this group from the final list
        }

        // Attach the filtered children to the group
        item.children = filteredChildren;
        return true; // Include this group in the final list
      }
      return false; // Exclude this group if the user has no access
    })
    .map((item) => <NavGroup key={item.id} item={item} />);

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
}


