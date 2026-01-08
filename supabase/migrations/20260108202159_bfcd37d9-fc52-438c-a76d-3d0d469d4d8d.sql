-- Add UPDATE policy for rate_limits table to complete RLS protection
CREATE POLICY "Users can update their own rate limits"
ON public.rate_limits
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);