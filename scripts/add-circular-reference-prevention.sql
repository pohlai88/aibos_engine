-- Function to prevent circular references in tenant hierarchy
CREATE OR REPLACE FUNCTION prevent_circular_tenant()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.parent_id IS NOT NULL THEN
    IF EXISTS (
      WITH RECURSIVE ancestors AS (
        SELECT id, parent_id FROM tenants WHERE id = NEW.parent_id
        UNION
        SELECT t.id, t.parent_id FROM tenants t
        JOIN ancestors a ON t.id = a.parent_id
      )
      SELECT 1 FROM ancestors WHERE id = NEW.id
    ) THEN
      RAISE EXCEPTION 'Circular tenant reference detected';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to check for circular references
CREATE TRIGGER check_circular_tenant
BEFORE INSERT OR UPDATE ON tenants
FOR EACH ROW EXECUTE FUNCTION prevent_circular_tenant(); 