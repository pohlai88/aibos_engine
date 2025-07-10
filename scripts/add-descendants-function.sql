-- SQL function for getting all descendants of a tenant
CREATE OR REPLACE FUNCTION get_tenant_descendants(parent_id UUID)
RETURNS SETOF tenants AS $$
  WITH RECURSIVE descendants AS (
    SELECT * FROM tenants WHERE id = parent_id
    UNION
    SELECT t.* FROM tenants t
    JOIN descendants d ON t.parent_id = d.id
  )
  SELECT * FROM descendants WHERE id != parent_id; -- Exclude the parent
$$ LANGUAGE SQL;

-- Test the function
-- SELECT * FROM get_tenant_descendants('06db96c2-ec8a-40a2-a438-ec4f81e1508b'); 