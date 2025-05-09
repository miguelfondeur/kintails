-- Update the handle_new_user function to use the specific default avatar
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
DECLARE
  default_avatar_options JSONB := '{
    "skinColor": "d78774",
    "hair": "bald",
    "body": "squared",
    "nose": "mediumRound",
    "eyes": "open",
    "mouth": "smirk",
    "facialHair": "",
    "hairColor": "362c47",
    "clothingColor": "456dff",
    "backgroundColor": "bde4a7",
    "facialHairProbability": 0
  }';
BEGIN
  INSERT INTO public.profiles (
    id, 
    username, 
    avatar_seed,
    avatar_options,
    created_at, 
    updated_at
  )
  VALUES (
    new.id, 
    split_part(new.email, '@', 1), 
    split_part(new.email, '@', 1),
    default_avatar_options,
    now(), 
    now()
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- If trigger doesn't exist, create it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user(); 