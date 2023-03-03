import { ThemeMode } from '@app/utilities/hooks/ColorModeContainer';
import { FormControlLabel, FormGroup, Switch } from '@material-ui/core';

interface Props {
  themeName: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<Props> = ({ themeName, toggleTheme }) => {
  return (
    <FormGroup>
      <FormControlLabel
        checked={themeName === 'dark'}
        control={<Switch onClick={toggleTheme} defaultChecked />}
        label={themeName === 'dark' ? 'Dark Theme' : 'Light Theme'}
      />
    </FormGroup>
  );
};
