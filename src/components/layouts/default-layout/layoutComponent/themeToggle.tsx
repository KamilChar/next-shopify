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
        control={<Switch onClick={toggleTheme} checked={themeName === 'dark'} />}
        label={themeName === 'dark' ? 'Dark Theme' : 'Light Theme'}
      />
    </FormGroup>
  );
};
