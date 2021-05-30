import {PERMISSIONS_QUERY, Security} from './Security';
import {EffectivePermsInfo, EntityPermissionValue, Permission, AttributePermissionValue} from '@haulmont/jmix-rest';
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {MockLink} from "@apollo/client/testing";

describe('Security service', () => {
  // todo enable once haulmont/jmix-graphql/114 is resolved
  xdescribe('Security#canUploadFiles()', () => {
    it('should return true when upload permission is granted', async () => {
      expect((await createSecurityWithLoadedPerms()).canUploadFiles()).toBe(true);
    });

    it('should return false when upload permission is denied', async () => {
      expect((await createSecurityWithLoadedPerms({
        specific: [{target: 'rest.fileUpload.enabled', value: 0}]
      })).canUploadFiles()).toBe(false);
    });

    it('should return false when upload permission is undefined', async () => {
      expect((await createSecurityWithLoadedPerms({
        specific: []
      })).canUploadFiles()).toBe(false);
    });
  });

  describe('Security#isOperationPermissionGranted()', () => {
    it('should return false if permissions are not loaded', async () => {
      expect((await createSecurity())
        .isOperationPermissionGranted('scr$Garage', 'create'))
        .toBe(false);
    });

    it('should return true if permission is granted', async () => {
      expect((await createSecurityWithLoadedPerms())
        .isOperationPermissionGranted('scr$Garage', 'create'))
        .toBe(true);
    });

    it('should return false if permission is not granted', async () => {
      expect((await createSecurityWithLoadedPerms())
        .isOperationPermissionGranted('scr$Car', 'create'))
        .toBe(false);
    });
  });

  describe('Security#isAttributePermissionGranted()', () => {
    it('should return false if permissions are not loaded', async () => {
      expect((await createSecurity())
        .isAttributePermissionGranted('scr$Car', 'name', 'VIEW'))
        .toBe(false);
    });

    it('should return true if permission is granted', async () => {
      expect((await createSecurityWithLoadedPerms({
        entityAttributes: [{
          target: 'scr$Car:name',
          value: 1
        }]
      }))
        .isAttributePermissionGranted('scr$Car', 'name', 'VIEW'))
        .toBe(true);
    });

    it('should return false if permission is not granted', async () => {
      expect((await createSecurityWithLoadedPerms())
        .isAttributePermissionGranted('scr$Car', 'name', 'VIEW'))
        .toBe(false);
    });
  });
});

type PermsMockConfig = {
  entities?: Array<Permission<EntityPermissionValue>>,
  entityAttributes?: Array<Permission<AttributePermissionValue>>,
  specific?: Array<Permission<EntityPermissionValue>>,
  undefinedPermissionPolicy?: 'ALLOW' | 'DENY'
};

async function createSecurityWithLoadedPerms(permsMockConfig?: PermsMockConfig): Promise<Security> {
  const security = await createSecurity(permsMockConfig);
  await security.loadPermissions();
  return security;
}

async function createSecurity(permsMockConfig?: PermsMockConfig): Promise<Security> {
  const mockApolloClient = new ApolloClient<{}>({
    link: new MockLink([{
      request: {
        query: PERMISSIONS_QUERY,
      },
      result: {
        data: {
          permissions: createPerms(permsMockConfig),
        },
      },
    }]),
    cache: new InMemoryCache({})
  });
  return new Security(mockApolloClient);
}

function createPerms(
  {entities, entityAttributes, specific}: PermsMockConfig = {}
): EffectivePermsInfo {
  return {
    entities: entities ?? [{target: 'scr$Garage:create', value: 1}],
    entityAttributes: entityAttributes ?? [],
    specifics: specific ?? [{target: 'rest.fileUpload.enabled', value: 1}],
  };
}
