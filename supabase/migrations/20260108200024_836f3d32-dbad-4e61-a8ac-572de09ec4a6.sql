-- Create rate_limits table for tracking API calls
CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  function_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient querying
CREATE INDEX idx_rate_limits_user_function_time ON public.rate_limits (user_id, function_name, created_at DESC);

-- Enable RLS
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Users can only see their own rate limit records
CREATE POLICY "Users can view their own rate limits"
ON public.rate_limits
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own rate limit records
CREATE POLICY "Users can insert their own rate limits"
ON public.rate_limits
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Service role can do anything (for edge functions)
CREATE POLICY "Service role can manage all rate limits"
ON public.rate_limits
FOR ALL
USING (true)
WITH CHECK (true);

-- Auto-cleanup old records (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.rate_limits WHERE created_at < now() - interval '24 hours';
END;
$$;