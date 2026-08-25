CREATE TABLE public.cv_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL,
  page_path TEXT,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.cv_downloads TO anon;
GRANT SELECT, INSERT ON public.cv_downloads TO authenticated;
GRANT ALL ON public.cv_downloads TO service_role;
ALTER TABLE public.cv_downloads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can record a CV download" ON public.cv_downloads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can view CV downloads" ON public.cv_downloads FOR SELECT TO authenticated USING (true);