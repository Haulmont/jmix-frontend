import path from "path";
import {promisify} from "util";
import {generate} from '../../../init';
import {assertFiles, opts} from '../../test-commons';

const rimraf = promisify(require('rimraf'));

const modelPath = 'src/test/fixtures/mpg-projectModel.json';

const CLIENT_DIR = path.join(process.cwd(), `src/test/generated/react-native-client`);
const FIXTURES_DIR = path.join(process.cwd(), `src/test/fixtures/react-native-client`);
const GENERATORS_DIR = path.join(__dirname, '../../../generators');

describe('react native generator test', () => {
  it('should generate React Native client app', async function () {
    await rimraf(`${CLIENT_DIR}/*`);

    await generate(path.join(GENERATORS_DIR, 'react-native', 'app'), opts(CLIENT_DIR, null, modelPath));
    assertFiles('components/Root.tsx', CLIENT_DIR, FIXTURES_DIR);
  });
});
