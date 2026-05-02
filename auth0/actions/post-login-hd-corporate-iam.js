/**
 * Auth0 — Post Login : IAM complet (tokens + app_metadata).
 * Déployer via Dashboard (voir README.md).
 *
 * @param {*} event - Auth0 Post Login event (user, authorization, secrets…).
 * @param {*} api - PostLoginAPI (setCustomClaim, etc.).
 */
exports.onExecutePostLogin = async (event, api) => {
  const secrets = event.secrets || {}
  const NS = (secrets.CLAIM_NAMESPACE || 'https://hd-corporate.com').replace(/\/$/, '')
  const u = event.user
  const authz = event.authorization || {}

  const rolesRaw = Array.isArray(authz.roles) ? authz.roles : []
  const roles = rolesRaw.map((r) => (typeof r === 'string' ? r : r && r.name)).filter(Boolean)

  const permsRaw = Array.isArray(authz.permissions) ? authz.permissions : []
  const permissions = permsRaw
    .map((p) => (typeof p === 'string' ? p : p && p.permission_name))
    .filter(Boolean)

  const givenName = u.given_name || u.app_metadata?.given_name || ''
  const familyName = u.family_name || u.app_metadata?.family_name || ''
  const photoUrl = u.picture || u.app_metadata?.picture_url || ''
  const fullName = u.name || u.app_metadata?.full_name || ''
  const nickname = u.nickname || u.app_metadata?.nickname || ''
  const locale = u.locale || u.app_metadata?.locale || ''
  const jobTitle = u.app_metadata?.job_title || ''
  const department = u.app_metadata?.department || ''
  const orgUnit = u.app_metadata?.org_unit || ''

  /** Claims access + ID (backoffice / API). */
  const setBoth = (key, value) => {
    const k = `${NS}/${key}`
    api.accessToken.setCustomClaim(k, value)
    api.idToken.setCustomClaim(k, value)
  }

  if (u.email) setBoth('email', u.email)
  setBoth('email_verified', u.email_verified === true)
  setBoth('given_name', givenName)
  setBoth('family_name', familyName)
  setBoth('full_name', fullName)
  setBoth('nickname', nickname)
  setBoth('photo_url', photoUrl)
  setBoth('locale', locale)
  setBoth('job_title', jobTitle)
  setBoth('department', department)
  setBoth('org_unit', orgUnit)
  setBoth('roles', roles)
  setBoth('permissions', permissions)

  const appMetadataForToken = {
    ...((u.app_metadata && typeof u.app_metadata === 'object' && u.app_metadata) || {}),
    given_name: givenName || undefined,
    family_name: familyName || undefined,
    picture_url: photoUrl || undefined,
    full_name: fullName || undefined,
    nickname: nickname || undefined,
    locale: locale || undefined,
    job_title: jobTitle || undefined,
    department: department || undefined,
    org_unit: orgUnit || undefined,
  }

  Object.keys(appMetadataForToken).forEach((k) => {
    if (appMetadataForToken[k] === undefined || appMetadataForToken[k] === '') {
      delete appMetadataForToken[k]
    }
  })

  setBoth('app_metadata', JSON.stringify(appMetadataForToken))

  const domain = secrets.AUTH0_DOMAIN
  const m2mId = secrets.M2M_CLIENT_ID
  const m2mSecret = secrets.M2M_CLIENT_SECRET

  if (!domain || !m2mId || !m2mSecret) {
    return
  }

  try {
    const tokenRes = await fetch(`https://${domain}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: m2mId,
        client_secret: m2mSecret,
        audience: `https://${domain}/api/v2/`,
      }),
    })
    if (!tokenRes.ok) return
    const { access_token: mgmtToken } = await tokenRes.json()
    if (!mgmtToken) return

    const prev = (u.app_metadata && typeof u.app_metadata === 'object' && u.app_metadata) || {}
    const merged = {
      ...prev,
      given_name: givenName || prev.given_name,
      family_name: familyName || prev.family_name,
      picture_url: photoUrl || prev.picture_url,
      full_name: fullName || prev.full_name,
      nickname: nickname || prev.nickname,
      locale: locale || prev.locale,
      job_title: jobTitle || prev.job_title,
      department: department || prev.department,
      org_unit: orgUnit || prev.org_unit,
      last_login_at: new Date().toISOString(),
    }

    Object.keys(merged).forEach((k) => {
      if (merged[k] === '' || merged[k] === undefined) delete merged[k]
    })

    const patchRes = await fetch(
      `https://${domain}/api/v2/users/${encodeURIComponent(u.user_id)}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${mgmtToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ app_metadata: merged }),
      }
    )
    if (!patchRes.ok) {
      console.log('HD IAM: app_metadata PATCH failed', patchRes.status)
    }
  } catch (e) {
    console.log('HD IAM: management sync error', e && e.message)
  }
}
