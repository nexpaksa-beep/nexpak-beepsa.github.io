import os
import requests

# 1. Fetch secure API keys from GitHub Secrets
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
FB_PAGE_ID = os.environ.get("FB_PAGE_ID")
FB_ACCESS_TOKEN = os.environ.get("FB_ACCESS_TOKEN")

def generate_marketing_post():
    """Uses AI to write a highly localized marketing post for PPE/Packaging."""
    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    
    prompt = (
        "Write a short, engaging professional Facebook marketing post for a company specializing in "
        "Industrial Packaging (pallet wrap, boxes) and PPE (Conti suits, safety boots) based in Gauteng. "
        "Include a call to action to visit our website to get an automated instant quote. "
        "Use local business terms, emojis, and relevant hashtags. Keep it under 150 words."
    )
    
    data = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.8
    }
    
    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()
        return response.json()['choices'][0]['message']['content']
    except Exception as e:
        print(f"Error generating text with OpenAI: {e}")
        return None

def post_to_facebook(content):
    """Publishes the generated text directly to your Facebook Business Page."""
    url = f"https://graph.facebook.com/v18.0/{FB_PAGE_ID}/feed"
    payload = {
        'message': content,
        'access_token': FB_ACCESS_TOKEN
    }
    
    try:
        response = requests.post(url, data=payload)
        response.raise_for_status()
        print("Successfully posted to Facebook!")
    except Exception as e:
        print(f"Error posting to Facebook: {e}")

if __name__ == "__main__":
    print("Generating marketing copy...")
    marketing_text = generate_marketing_post()
    
    if marketing_text:
        print(f"\nGenerated Post:\n{marketing_text}\n")
        print("Publishing to social networks...")
        post_to_facebook(marketing_text)
    else:
        print("Automation failed: No content generated.")
  
