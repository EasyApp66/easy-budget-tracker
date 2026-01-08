-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Service role can manage all rate limits" ON public.rate_limits;

-- Add a DELETE policy for users to clean up their own rate limits
CREATE POLICY "Users can delete their own rate limits"
ON public.rate_limits
FOR DELETE
USING (auth.uid() = user_id);